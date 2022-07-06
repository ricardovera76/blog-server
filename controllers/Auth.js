const User = require("../models/Users");

const signin = async (email, password) => {
  const loggedUser = User.find({ email: email });
  if (loggedUser.email !== email) {
    return {
      message:
        "Theres no existing user with this email address , try to sign up instead",
      code: 511,
    };
  }
  if (loggedUser.password !== password) {
    return {
      message: "Incorrect Password, please try again",
      code: 401,
    };
  }
  return loggedUser;
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
