import { connection } from "../database/database.js";
import { gameSchema } from "../models/game.model.js";

export async function gameValidation(req, res, next) {
   const {name, image, stockTotal, pricePerDay, categoryId} = req.body;

      const game = {
        name:name,
        image: image,
        stockTotal: stockTotal,
        pricePerDay: pricePerDay,
        categoryId: categoryId
    }

    try {

        const categoryExists = await connection.query(
            "SELECT * FROM categories WHERE id = $1::numeric",
            [categoryId]
          );
          
          if (categoryExists.rowCount === 0) {
            return res.sendStatus(400);
          }
          
          const nameExists = await connection.query(
            "SELECT * FROM games WHERE name = $1::text",
            [name]
          );
          
          if (nameExists.rowCount > 0) {
            return res.sendStatus(409);
          }
  
      const { error } = gameSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
      }
    } catch (err) {
       return res.status(500).send(`erro: ${err.message}`);
    }
  
    res.locals = game;
    next();
  }
  