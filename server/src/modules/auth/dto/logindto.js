import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class loginDto extends BaseDto {
  static schema = Joi.object({
    email: Joi.string().email().lowercase().max(200).required(),
    password: Joi.string().min(8).max(150).required()
  });
}

export default loginDto;
