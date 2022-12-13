import { connection } from "../database/database.js";

export async function deleteRentalValidation(req, res, next) {
  const { id } = req.params;

  try {
    const rentalExists = await connection.query(
      "SELECT * FROM rentals WHERE id = $1::numeric",
      [id]
    );

    if (rentalExists.rowCount === 0) {
      return res.sendStatus(400);
    }

    const isRentalFinished = await connection.query(
      `SELECT * FROM rentals WHERE id = $1::numeric AND "returnDate" IS NULL;`,
      [id]
    );

    if (isRentalFinished.rowCount !== 0) {
      return res.sendStatus(400);
    }
  } catch (err) {
    return res.status(500).send(`erro: ${err.message}`);
  }

  res.locals = req.params.id;
  next();
}