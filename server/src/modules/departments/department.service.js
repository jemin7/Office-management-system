import Department from "./department.model.js";
import ApiError from "../../common/utils/api-error.js";

const createdepartment = async (data) => {
  const existing = await Department.findOne({ name: data.name });
  if (existing) throw ApiError.Conflict("Department already exists");

  const department = await Department.create(data);
  return department;
};

const getAllDepartmentsService = async () => {
  const departments = await Department.find().sort({ name: 1 });
  return departments;
};

const updateDepartmentService = async (id, data) => {
  const department = await Department.findById(id);
  if (!department) throw ApiError.notFound("Department not found");

  if (data.name && data.name !== department.name) {
    const existing = await Department.findOne({ name: data.name });
    if (existing) throw ApiError.Conflict("Department already exists");
  }

  Object.assign(department, data);
  await department.save();
  return department;
};

const removeDepartmentService = async (id) => {
  const department = await Department.findByIdAndDelete(id);
  if (!department) throw ApiError.notFound("Department not found");
  return department;
};

export {
  createdepartment,
  getAllDepartmentsService,
  updateDepartmentService,
  removeDepartmentService,
};
