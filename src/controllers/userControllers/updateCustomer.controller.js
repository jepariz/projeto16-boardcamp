import { connection } from "../../database/database.js";

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday} = res.locals;

  const {id} = req.params

  console.log(id)

  try {
    await connection.query(
      `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5
      ;`,
      [name, phone, cpf, birthday, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
  
}