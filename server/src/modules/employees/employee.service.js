import ApiError from "../../common/utils/api-error.js";
import Employee from "./employee.model.js";

const createService = async (data) => {
  const existing = await Employee.findOne({ email: data.email });
  if (existing) throw ApiError.Conflict("Email already exists");
  const employeeobj = await Employee.create(data);
  return employeeobj;
};
const getAllService = async (query) => {
  const { page = 1, limit = 10, search, department, jobtitle } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  if (
    Number.isNaN(pageNum) ||
    Number.isNaN(limitNum) ||
    pageNum < 1 ||
    limitNum < 1
  ) {
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

  if (department) {
    filter.department = department;
  }

  if (jobtitle) {
    filter.jobtitle = jobtitle;
  }

  const employees = await Employee.find(filter)
    .populate("department")
    .populate("supervisor")
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  const total = await Employee.countDocuments(filter);

  return {
    total,
    page: pageNum,
    limit: limitNum,
    data: employees,
  };

  const getOneService = async (id) => {
    const employee = Employee.findById(id)
      .populate("department")
      .populate("super");

    if (!employee) {
      throw ApiError.notFound("Employee not found");
    }
    return employee;
  };

  const removeSerivce = async (id) => {
    const employee = Employee.findById(id);
    if (!employee) {
      throw ApiError.notFound("Employee not found");
    }
    return employee;
  };
};

export {
  createService,
  getAllService,
  getOneService,
  updateService,
  removeService,
};
