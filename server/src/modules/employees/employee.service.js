import ApiError from "../../common/utils/api-error.js";
import Employee from "./employee.model.js"

const createService = async(data) => {
    const existing = await Employee.findOne({ email: data.email });
    if (existing) throw ApiError.Conflict("Email already exists")
   const employeeobj = await Employee.create(data); 
   return employeeobj
};


export  {createService}