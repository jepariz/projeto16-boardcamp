import { connection } from "../../database/database.js";

export async function updateRentalReturn(req, res) {
  const {id, returnDate, delayFee} = res.locals;

  try {
    await connection.query(
      `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`,
      [returnDate, delayFee, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
  
}