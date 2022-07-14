import joi from "joi";

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

const authSchemas = { registerSchema, loginSchema };
export default authSchemas;
