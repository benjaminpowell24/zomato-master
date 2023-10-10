import joi from "joi";

//function to validate data sent to restaurant api
export const validateRestaurantCity = (restaurant) => {
    const schema = joi.object({
        city: joi.string().required(),
    });

    return schema.validateAsync(restaurant);
}
//validate search string input
export const validateSearchString = (restaurant) => {
    const schema = joi.object({
        searchString: joi.string().required(),
    });

    return schema.validateAsync(restaurant);
}