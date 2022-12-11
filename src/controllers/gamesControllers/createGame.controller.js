import { connection } from "../../database/database.js";

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay, categoryId } = res.locals;

  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(`erro: ${err.message}`);
  }
  
}