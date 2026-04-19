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
    .limit(limitNum);

  const total = await Employee.countDocuments(filter);

  return {
    total,
    page: pageNum,
    limit: limitNum,
    data: employees,
  };
};



export { createService, getAllService };
