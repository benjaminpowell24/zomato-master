import joi from "joi";

export const validateOrderDetails = (orderData) => {
    const schema = joi.object({
        user: joi.string().hex().length(24),
        orderDetails: joi.array().items(joi.object({
            food: joi.string().hex().length(24),
            quantity: joi.number().max(20).required(),
            paymentMode: joi.string().required(),
            status: joi.string().required(),
            paymentDetails: joi.object({
                orderTotal: joi.number().min(1).required(),
                promo: joi.number(),
                tax: joi.number().min(0).required()
            })
        }))
    });

    return schema.validateAsync(orderData);
}

export const validateOrderStatus = (status) => {
    if(typeof status == String){
        if(status == "placed" || status == "in progress" || status == "ready" || 
        status == "delivery in progress"|| status == "completed" || status == "cancelled"){
        }else{
            throw new Error("Invalid order status");
        }
    }else{
        throw new Error("order status must be of string type");
    }
    return false;
}