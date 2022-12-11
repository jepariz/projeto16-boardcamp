import joi from "joi"

export const gameSchema = joi.object({
    name: joi.string().min(3).required(),
    image: joi.string(),
    stockTotal: joi.number().greater(0),
    pricePerDay: joi.number().greater(0),
    categoryId: joi.number()
})