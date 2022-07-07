const User = require("../models/Users");

const signin = async (email, password) => {
  const loggedUser = await User.find({ email: { $eq: email } });
  console.log(loggedUser.length);
  if (loggedUser.length === 0) {
    return {
      message:
        "Theres no existing user with this combination of email address and password, try to sign up instead",
      code: 511,
    };
  }
  if (loggedUser[0].password !== password) {
    return {
      message: "Incorrect Password, please try again",
      code: 401,
    };
  }
  return { message: "Access granted", code: 200 };
};

const signup = async (userData) => {
  try {
    const user = await User.create(userData);
    user.save();
    console.log(user);
    return {
      code: 200,
      message: "user successfully created",
      userId: user._id,
      userName: user.name,
      userRole: user.role,
      userEmail: user.email,
    };
  } catch (e) {
    const errorCode = e.code || 400;
    const errorMessage = e.message || "Cannot create user at this time";
    return {
      code: errorCode,
      message: errorMessage,
    };
  }
};

module.exports = { signin, signup };

/*
{ 
  name: string;
  email: string;
  phone: string;
  role: string;
  ip: string;
  password: String
  age?: number | undefined; 
}
*/
