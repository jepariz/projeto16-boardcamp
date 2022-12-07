import { categorySchema } from "../models/category.model.js";

export function categoryValidation (req, res, next){

    const name = req.body;

    const {error} = categorySchema.validate(name, {abortEarly: false})

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    res.locals.category = name
    next()
}