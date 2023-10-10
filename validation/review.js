import joi from "joi";

export const validateReviewData = (reviewData) => {
    const schema = joi.object({
        food: joi.string().hex().length(24),
        restaurant: joi.string().hex().length(24),
        user: joi.string().hex().length(24),
        rating: joi.number().required(),
        comment: joi.string().required(),
        isRestaurantReview: joi.boolean(),
        isFoodReview: joi.boolean(),
        photos: joi.array().items(joi.object({type: joi.string().hex().length(24), ref: joi.string()}))
    });

    return schema.validateAsync(reviewData);
}