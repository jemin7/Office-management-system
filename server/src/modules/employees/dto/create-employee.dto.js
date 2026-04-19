import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";


class createDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().lowercase().max(200).required(),
    jobtitle: Joi.string().trim().max(50).required(),
    department: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    supervisor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().allow(null),
    country: Joi.string().trim().max(50).required(),
    state: Joi.string().trim().max(50).required(),
    city: Joi.string().trim().max(50).required(),
  });
}

export default createDto