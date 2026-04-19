import Department from "./department.model.js";
import ApiError from "../../common/utils/api-error.js";

const createdepartment = async (data) => {
     const existing = await Department.findOne({name: data.name});
      if (existing) throw ApiError.Conflict("Department already exists");
      const name = Department.create(data);

      return name
}


export default createdepartment