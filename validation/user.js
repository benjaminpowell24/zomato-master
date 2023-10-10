import joi from "joi";

export const validateUserById = (userID) => {
    const schema = joi.object({
        _id: joi.string().required()
    });

    return schema.validateAsync(userID);
}

export const validateUserData = (userData) => {
    const schema = joi.object({
        fullname: joi.string().min(2),
        email: joi.string().email(),
        address: joi.array().items(joi.object({details: joi.string(), for: joi.string()})),
        contact: joi.number().min(10).max(10)
    });

    return schema.validateAsync(userData);
}