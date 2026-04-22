import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class updateDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().max(50),
    email: Joi.string().email().trim().max(200).lowercase(),
    password: Joi.string().min(8).max(128),
    role: Joi.string().valid("admin", "user"),
    jobtitle: Joi.string().trim().max(50),
    department: Joi.string(),
    supervisor: Joi.string().empty("").default(null),
    country: Joi.string().trim().max(50),
    state: Joi.string().trim().max(50),
    city: Joi.string().trim().max(50),
  });
}

export default updateDto;
