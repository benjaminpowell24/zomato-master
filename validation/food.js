import joi from "joi";

//create and export function to validate data sent to restaurant api 
export const validateRestaurantId = (resId) => {
    const schema = joi.object({
        _id: joi.string().required(),
    });

    return schema.validateAsync(resId);
}
//validate category
export const validateCategory = (category) => {
    const schema = joi.object({
        category: joi.string().required(),
    });

    return schema.validateAsync(category);
}
