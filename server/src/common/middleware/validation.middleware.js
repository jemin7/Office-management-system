import ApiError from "../utils/api-error.js";



function validate(Dtoclass, source = 'body')  {
    return (req, res, next) => {
      const { errors, value } = Dtoclass.validate(req[source]); 

      if (errors) {
        throw ApiError.badrequest(errors.join("; "));
      }

      req[source] = value;
      next();
    }
}
export default validate;



export default validate