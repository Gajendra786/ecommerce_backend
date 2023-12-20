import { User } from "../models/user.models.js";

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      throw new Error("user already exists");
    }
    const user = await User.create({ firstName, lastName, email, password });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// const findUserById = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error("User not found with id");
//     }
//     return user;
//   } catch (error) {
//     throw new Error(error);
//   }
// };


const findUserById = async (userId) => {
  try {
    const user = await User.findOne({userId});
    if (!user) {
      throw new Error("User not found with id");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with email");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

export { createUser, findUserByEmail, findUserById, getAllUsers };
