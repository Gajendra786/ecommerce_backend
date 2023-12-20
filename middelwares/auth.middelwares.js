import { SECRET_KEY } from "../config/Enum.js";
import {findUserById} from "../helpers/user.helpers.js"
import jwt from "jsonwebtoken";

const tokenCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({
        status: "success",
        message: "Token is not found",
      });
    }
    jwt.verify(token, SECRET_KEY, async function (err, decoded) {
      if(err){
        return res.status(400).json({
          status: "success",
          message: "Unauthorised Access",
        });
      }
      const { userId } = decoded
      if(!userId){
        return res.status(400).json({
          status: "success",
          message: "Unauthorised Access",
        });
      }
      const user = await findUserById(userId)
      req.user = user
      next()
    });
  } catch (error) {
    console.log(`Error is occur in tokenCheck: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { tokenCheck };
