import joi from "joi"

export const rentalSchema = joi.object({
    customerId: joi.number(),
    gameId: joi.number(),
    daysRented: joi.number().greater(0)
})