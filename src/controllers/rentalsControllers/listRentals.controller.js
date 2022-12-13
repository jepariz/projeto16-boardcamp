import { connection } from "../../database/database.js";

export async function listRentals(req, res) {
  const customerId = req.query.customerId;

  const gameId = req.query.gameId;

  try {
    if (customerId) {
      const filteredRentalsByCustomer = await connection.query(
        `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
        json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        WHERE "customerId"=$1;`,
        [customerId]
      );

      return res.send(filteredRentalsByCustomer.rows);
    }

    if (gameId) {
      const filteredRentalsByGame = await connection.query(
        `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
        json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        WHERE "gameId"=$1;`,
        [gameId]
      );

      return res.send(filteredRentalsByGame.rows);
    }

    const rentals =
      await connection.query(`SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
    json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
    JOIN categories ON games."categoryId" = categories.id;
 `);

    return res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
