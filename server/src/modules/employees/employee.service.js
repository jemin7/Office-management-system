import ApiError from "../../common/utils/api-error.js";
import Employee from "./employee.model.js";

const createService = async (data) => {
  const existing = await Employee.findOne({ email: data.email });
  if (existing) throw ApiError.conflict("Email already exists");
  const employee = await Employee.create(data);
  return employee.populate(["department", "supervisor"]);
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

  if (department) filter.department = department;
  if (jobtitle) filter.jobtitle = { $regex: jobtitle, $options: "i" };

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .populate("department")
      .populate("supervisor", "name email jobtitle")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 }),
    Employee.countDocuments(filter),
  ]);

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
  if (data.supervisor === "") data.supervisor = null;

  const employee = await Employee.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("department")
    .populate("supervisor", "name email jobtitle");

  if (!employee) throw ApiError.notFound("Employee not found");
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
