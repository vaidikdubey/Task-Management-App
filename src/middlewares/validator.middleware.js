import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    //Learning steps
    console.log("Errors extracted from validationResult is: ", errors);
    console.log(`Type of errors is ${typeof errors}`);
    
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({
        [err.path]: err.msg
    }))

    throw new ApiError(422, "Received data is not valid", extractedErrors);
}