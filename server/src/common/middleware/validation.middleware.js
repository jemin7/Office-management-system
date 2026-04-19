import ApiError from "../utils/api-error.js";



function validate(Dtoclass)  {
    return (req,res,next) => {
      const {errors,value} =  Dtoclass.validate(req.body)

      if (errors) {
        throw ApiError.badrequest(errors.join("; "))
      }

      req.body = value

      next()
    }
}


export default validate