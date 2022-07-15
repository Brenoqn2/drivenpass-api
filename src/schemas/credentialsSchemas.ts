import joi from "joi";

const createSchema = joi.object({
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  title: joi.string().required(),
});

const credentialsSchemas = { createSchema };
export default credentialsSchemas;
