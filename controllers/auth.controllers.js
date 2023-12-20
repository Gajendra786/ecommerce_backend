import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { emailValidate } from "../helpers/common.helpers.js";
import { User } from "../models/user.models.js";
import { tokenGenerator } from "../helpers/common.helpers.js";
import { createCart } from "../helpers/cart.helpers.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Required fields are missing!!");
      return res.status(404).json({
        status: "success",
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not exists with email: ${email}`);
      return res.status(404).json({
        status: "success",
        message: "User not exists",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      console.log(`Wrong password`);
      return res.status(401).json({
        status: "success",
        message: "Unauthorised Credentials",
      });
    }

    const token = tokenGenerator(user);

    return res.status(200).json({
      status: "success",
      message: "Successfully login!!!",
      data: {
        token,
      },
    });
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
    //validate email
    if (!emailValidate(email)) {
      console.log(`Invalid email :${email}`);
      return res.status(400).json({
        status: "success",
        message: "Invalid email request",
      });
    }

    //check user
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      console.log(`User email already taken :${email}`);
      return res.status(409).json({
        status: "success",
        message: "User already exists",
      });
    }

    // insert new document
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password,
      userId: new ObjectId(),
    }).save();

    // create cart 
    await createCart(newUser);
    
    console.log(`New user details ${newUser}`);
    const token = tokenGenerator(newUser);
    res.status(200).json({
      status: "success",
      message: "Successfully user has created",
      data: {
        userData: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(`Error is occur in signup: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};


export { login, signup };
