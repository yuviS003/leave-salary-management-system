const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(reqBody) {
  const { empEmail, empPassword } = reqBody;
  const userExistsWithEmail = await db.Employee.scope("withHash").findOne({
    where: { EMP_EMAIL: empEmail },
  });

  console.log("userExistsWithEmail-->", userExistsWithEmail);
  if (!userExistsWithEmail) {
    throw new Error("Employee does not exist with this email");
  }

  const isPasswordValid = await bcrypt.compare(
    empPassword,
    userExistsWithEmail.EMP_PASSWORD
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  console.log("Password is also valid");

  //generate token
  const token = jwt.sign(
    {
      empId: userExistsWithEmail.EMP_ID,
      empEmail: userExistsWithEmail.EMP_EMAIL,
      empType: userExistsWithEmail.EMP_TYPE,
      empPermission: userExistsWithEmail.EMP_PERMISSION,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  const userDataToBeReturned = {
    empId: userExistsWithEmail.EMP_ID,
    empEmail: userExistsWithEmail.EMP_EMAIL,
    empType: userExistsWithEmail.EMP_TYPE,
    empPermission: userExistsWithEmail.EMP_PERMISSION,
  };
  return { ...userDataToBeReturned, token };
}

module.exports = {
  login,
};
