import Department from "./department.model.js";
import ApiError from "../../common/utils/api-error.js";

const createdepartment = async (data) => {
     const existing = await Department.findOne({name: data.name});
      if (existing) throw ApiError.Conflict("Department already exists");
     const department = await Department.create(data);
     return department;

}

const getAllDepartmentsService = async () => {
  const departments = await Department.find().sort({ name: 1 });

  if (!departments || departments.length === 0) {
    throw ApiError.notFound("No departments found");
  }

  return departments;
};


export { createdepartment, getAllDepartmentsService };