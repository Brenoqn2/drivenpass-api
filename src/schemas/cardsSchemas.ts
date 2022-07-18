import joi from "joi";

const createCardSchema = joi.object({
  title: joi.string().required(),
  number: joi
    .string()
    .pattern(/^[0-9 ]*$/)
    .required(),
  name: joi.string().required(),
  expireDate: joi.string().required(),
  cvv: joi.number().required(),
  type: joi.string().valid("credit", "debit", "creditAndDebit").required(),
  password: joi.string().required(),
});

const cardsSchemas = { createCardSchema };
export default cardsSchemas;
