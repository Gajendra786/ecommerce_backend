import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/Enum.js";

const emailValidate = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(email);
};

const tokenGenerator = (payload) => {
  const {userId,email,role,firstName } = payload
  const token = jwt.sign({userId,email,role,firstName}, SECRET_KEY,);
  return token;
};

export { emailValidate, tokenGenerator };
