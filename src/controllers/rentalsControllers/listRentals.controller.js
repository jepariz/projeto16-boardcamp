import { connection } from "../../database/database.js";

export async function listRentals(req, res) {
  const customerId = req.query.customerId;

  const gameId = req.query.gameId;

  try {
    if (customerId) {
      const filteredRentalsByCustomer = await connection.query(
        `SELECT 
        json_build_object('id', rentals.id,
            'customerId', rentals."customerId",
            'gameId', rentals."gameId",
            'rentDate', rentals."rentDate",
            'daysRented', rentals."daysRented",
            'returnDate', rentals."returnDate",
            'originalPrice', rentals."originalPrice",
            'delayFee', rentals."delayFee",
            'customer', json_build_object(
                'id', customers.id,
                'name', customers.name,
                'game', json_build_object(
                    'id', games.id,
                    'name', games.name,
                    'categoryId', games."categoryId",
                    'categoryName', categories.name 
                   )))
    FROM rentals
    INNER JOIN customers ON rentals."customerId" = customers.id
    INNER JOIN games ON rentals."gameId" = games.id
    INNER JOIN categories ON games."categoryId" = categories.id
    WHERE "customerId"=$1`,
        [customerId]
      );

      return res.send(filteredRentalsByCustomer.rows);
    }

    if (gameId) {
      const filteredRentalsByGame = await connection.query(
        `SELECT 
        json_build_object('id', rentals.id,
            'customerId', rentals."customerId",
            'gameId', rentals."gameId",
            'rentDate', rentals."rentDate",
            'daysRented', rentals."daysRented",
            'returnDate', rentals."returnDate",
            'originalPrice', rentals."originalPrice",
            'delayFee', rentals."delayFee",
            'customer', json_build_object(
                'id', customers.id,
                'name', customers.name,
                'game', json_build_object(
                    'id', games.id,
                    'name', games.name,
                    'categoryId', games."categoryId",
                    'categoryName', categories.name 
                   )))
    FROM rentals
    INNER JOIN customers ON rentals."customerId" = customers.id
    INNER JOIN games ON rentals."gameId" = games.id
    INNER JOIN categories ON games."categoryId" = categories.id
    WHERE "gameId"=$1`,
        [gameId]
      );

      return res.send(filteredRentalsByGame.rows);
    }

    const rentals = await connection.query(`SELECT 
    json_build_object('id', rentals.id,
        'customerId', rentals."customerId",
        'gameId', rentals."gameId",
        'rentDate', rentals."rentDate",
        'daysRented', rentals."daysRented",
        'returnDate', rentals."returnDate",
        'originalPrice', rentals."originalPrice",
        'delayFee', rentals."delayFee",
        'customer', json_build_object(
            'id', customers.id,
            'name', customers.name,
            'game', json_build_object(
                'id', games.id,
                'name', games.name,
                'categoryId', games."categoryId",
                'categoryName', categories.name 
               )))
FROM rentals
INNER JOIN customers ON rentals."customerId" = customers.id
INNER JOIN games ON rentals."gameId" = games.id
INNER JOIN categories ON games."categoryId" = categories.id;
 `);

    return res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
