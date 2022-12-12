import { connection } from "../../database/database.js";

export async function createRental(req, res) {
  const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = res.locals;

  try {
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(`erro: ${err.message}`);
  }
  
}