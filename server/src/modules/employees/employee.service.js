import ApiError from "../../common/utils/api-error.js";
import Employee from "./employee.model.js";

const createService = async (data) => {
  const existing = await Employee.findOne({ email: data.email });
  if (existing) throw ApiError.Conflict("Email already exists");

  const employee = await Employee.create(data);
  return await employee.populate(["department", "supervisor"]);
};

const getAllService = async (query) => {
  const { page = 1, limit = 10, search, department, jobtitle } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
    throw ApiError.badRequest("Invalid pagination input");
  }

  const skip = (pageNum - 1) * limitNum;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Ensure department is only added to filter if it's a valid truthy string
  if (department && department.trim() !== "") {
    filter.department = department;
  }

  if (jobtitle) filter.jobtitle = { $regex: jobtitle, $options: "i" };

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .populate("department")
      .populate("supervisor", "name email jobtitle")
      .skip(skip)
      .limit(limitNum)
      // Fix: Added _id: -1 as a fallback sort for manually inserted documents missing timestamps
      .sort({ createdAt: -1, _id: -1 }),
    Employee.countDocuments(filter),
  ]);

  console.log(
    `Found ${employees.length} employees for page ${pageNum}. Total in DB matching filter: ${total}`,
  );
  console.log("Active Filter:", filter);

  return {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    data: employees,
  };
};

const getOneService = async (id) => {
  const employee = await Employee.findById(id)
    .populate("department")
    .populate("supervisor", "name email jobtitle");
  if (!employee) throw ApiError.notFound("Employee not found");
  return employee;
};

const updateService = async (id, data) => {
  const employee = await Employee.findById(id).select("+password");

  if (!employee) throw ApiError.notFound("Employee not found");

  if (data.email && data.email !== employee.email) {
    const existing = await Employee.findOne({ email: data.email });
    if (existing) throw ApiError.Conflict("Email already exists");
  }

  Object.assign(employee, data);
  await employee.save();

  await employee.populate("department");
  await employee.populate("supervisor", "name email jobtitle");

  return employee;
};

const removeService = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) throw ApiError.notFound("Employee not found");
  return employee;
};

export {
  createService,
  getAllService,
  getOneService,
  updateService,
  removeService,
};
