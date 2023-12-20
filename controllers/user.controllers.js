import { User } from "../models/user.models.js";
import { getAllUsers, findUserById } from "../helpers/user.helpers.js";

const test = (req, res) => {
  const { userInfo } = req;
  return res.status(200).json({
    message: "Working fine",
    data: userInfo,
  });
};

const list = async (req, res) => {
  try {
    const userList = await getAllUsers();
    // const userList = await User.find()
    console.log(`User List: ${JSON.stringify(userList)}`);
    return res.status(200).json({
      status: "success",
      result: userList,
    });
  } catch (error) {
    console.log(`Error is occur in list: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.userInfo
    console.log(`Profile fetching process is running for : ${userId}`)
    const user = await findUserById(userId)
    console.log(`User details :${user}`)
    return res.status(200).json({
        status: "success",
        result: user,
      });
  } catch (error) {
    console.log(`Error is occur in profile: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const updateProfile = async(req,res)=>{
  try {
    const {firstName,lastName} = req.body
    if(!firstName && !lastName){
      console.log("Mandate fields are not present");
      return res.status(404).json({
        status: "success",
        message: "All fields are required",
      });
    }
    const { userId } = req.userInfo
    const updateObj = {}
    firstName?updateObj.firstName = firstName:null
    lastName?updateObj.lastName = lastName:null
    const updateUser = await User.findOneAndUpdate({userId},updateObj,{
      new: true
    })
    if(!updateUser){
      console.log("Update profile process not done!");
      return res.status(404).json({
        status: "success",
        message: "User profile not updated!!",
      });
    }

    return res.status(200).json({
      status:"success",
      result:updateUser
    })
  } catch (error) {
    console.log(`Error is occur in profile: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

export { test, list,getProfile,updateProfile };
