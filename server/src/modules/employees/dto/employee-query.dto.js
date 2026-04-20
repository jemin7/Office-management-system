import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class queryDto extends BaseDto {
  static schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().trim().min(1).max(150),
    department: Joi.string(),
    jobtitle: Joi.string().trim(), // was jobTitle
  });
}

export default queryDto;
