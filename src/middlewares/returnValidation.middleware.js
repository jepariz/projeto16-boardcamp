import { connection } from "../database/database.js";
import dayjs from "dayjs";

export async function returnValidation(req, res, next) {
  const { id } = req.params;

  let data;

  const currentDay = dayjs().format("YYYY-MM-DD");

  try {
    const rentalExists = await connection.query(
      "SELECT * FROM rentals WHERE id = $1::numeric",
      [id]
    );

    if (rentalExists.rowCount === 0) {
      return res.sendStatus(400);
    }

    const isRentalFinished = await connection.query(
      `SELECT * FROM rentals WHERE id = $1::numeric AND "returnDate" IS NOT NULL;`,
      [id]
    );

    if (isRentalFinished.rowCount !== 0) {
      return res.sendStatus(400);
    }

    const findRentDate = await connection.query(
      `SELECT TO_CHAR("rentDate", 'YYYY-MM-DD') FROM rentals WHERE id = $1::numeric;`,
      [id]
    );
    const rentDate = findRentDate.rows[0].to_char;
    const today = dayjs(currentDay);
    const fees = today.diff(rentDate, "day");

    const gamePrice = rentalExists.rows[0].originalPrice / rentalExists.rows[0].daysRented

    const delayFee = gamePrice * fees;

    console.log(gamePrice)

    data = {
      id: req.params.id,
      returnDate: currentDay,
      delayFee: delayFee,
    };
  } catch (err) {
    return res.status(500).send(`erro: ${err.message}`);
  }

  res.locals = data;
  next();
}
