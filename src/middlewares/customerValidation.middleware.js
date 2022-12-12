import { connection } from "../database/database.js";
import { customerSchema } from "../models/customer.model.js";


export async function customerValidation(req, res, next) {
   const {name, phone, cpf, birthday} = req.body;

      const customer = {
        name:name,
        phone: phone,
        cpf: cpf,
        birthday: birthday
    }

    try {

          const cpfExists = await connection.query(
            'SELECT * FROM customers WHERE cpf= $1::varchar(11)',
            [cpf]
          );
          
          if (cpfExists.rowCount > 0) {
            return res.sendStatus(409);
          }
  
      const { error } = customerSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
      }
    } catch (err) {
       return res.status(500).send(`erro: ${err.message}`);
    }
  
    res.locals = customer;
    next();
  }
  