import { ObjectId } from "mongodb";
import { emailValidate } from "../helpers/common.helpers.js";
import { User } from "../models/user.models.js";

const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(`Error is occur in login: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // ------pattern 1------
    // if(!firstName || !lastName || !email || !password){
    //     console.log("Mandate fields are not present")
    //     res.status(404).json({
    //         status:"success",
    //         message:"All fields are required"
    //     })
    // }
    // ------pattern 2-----
    if (!(firstName && lastName && email && password)) {
      console.log("Mandate fields are not present");
      return res.status(404).json({
        status: "success",
        message: "All fields are required",
      });
    }
    if (!emailValidate(email)) {
      console.log(`Invalid email :${email}`);
      return res.status(400).json({
        status: "success",
        message: "Invalid email request",
      });
    }
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      console.log(`User email already taken :${email}`);
      return res.status(409).json({
        status: "success",
        message: "User already exists",
      });
    }
    const newUser = await new User({
        firstName, lastName, email, password,
        userId:new ObjectId()
    }).save()
    console.log(`New user details ${newUser}`)
    res.status(200).json({
        status:"success",
        message:"Successfully user has created",
        data:newUser
    })
  } catch (error) {
    console.log(`Error is occur in signup: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { login, signup };
