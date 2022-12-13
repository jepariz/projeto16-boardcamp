import { connection } from "../database/database.js";
import { categorySchema } from "../models/category.model.js";

export async function categoryValidation(req, res, next) {
  const name = req.body;

  try {
    const categoryExists = await connection.query(
      "SELECT * FROM categories WHERE name= $1",
      [name]
    );

    if (categoryExists.rowCount > 0) {
     return res.sendStatus(409);
    }

    const { error } = categorySchema.validate(name, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
  } catch (err) {
    res.sendStatus(500);
  }

  res.locals.category = name;
  next();
}
