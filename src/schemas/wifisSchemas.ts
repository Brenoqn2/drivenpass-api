import joi from "joi";

const createWifiSchema = joi.object({
  ssid: joi.string().required(),
  password: joi.string().required(),
  title: joi.string().required(),
});

const wifisSchemas = { createWifiSchema };
export default wifisSchemas;
