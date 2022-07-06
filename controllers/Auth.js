const User = require("../models/Users");

const signin = async (email, password) => {
  const loggedUser = await User.find({ email:{$eq: email} });
  if (loggedUser[0].email !== email) {
    return {
      message:
        "Theres no existing user with this convination of email address and password, try to sign up instead",
      code: 511,
    };
  }
  if (loggedUser[0].password !== password) {
    return {
      message: "Incorrect Password, please try again",
      code: 401,
    };
  }
  return {message: "yay", code: 200};
};

const signup = async (userData) => {
  const user = await User.create(userData);
  user.save();
  return {
    message: "user successfully created",
    userId: user["_id"],
    userName: user.name,
    userRole: user.role,
    userEmail: user.email,
  };
};

module.exports = { signin, signup };

/*
{ 
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  ip: string;
  password: String
  age?: number | undefined; 
}
*/
