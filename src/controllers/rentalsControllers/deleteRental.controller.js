import { connection } from "../../database/database.js";

export async function deleteRental(req, res) {
  const id = res.locals
  console.log(id)

  try {
    await connection.query(
      `DELETE FROM rentals WHERE id=$1;`,
      [id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
  
}