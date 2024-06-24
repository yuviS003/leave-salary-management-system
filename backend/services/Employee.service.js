const db = require("../db/db.js");
const bcrypt = require("bcrypt");

async function createEmployee(employee) {
  const userExistsWithEmail = await db.Employee.findOne({
    where: { EMP_EMAIL: employee.empEmail },
  });
  if (userExistsWithEmail) {
    throw new Error("Employee already exists with same email");
  }

  const userExistsWithPhone = await db.Employee.findOne({
    where: { EMP_PHONE: employee.empPhone },
  });
  if (userExistsWithPhone) {
    throw new Error("Employee already exists with this phone number");
  }

  const userExistsWithPan = await db.Employee.findOne({
    where: { EMP_PAN: employee.empPan },
  });
  if (userExistsWithPan) {
    throw new Error("Employee already exists with this PAN number");
  }

  const newEmployee = await new db.Employee({
    EMP_NAME: employee.empName,
    EMP_PASSWORD: await bcrypt.hash(employee.empPassword, 10),
    EMP_EMAIL: employee.empEmail,
    EMP_DOB: employee.empDob,
    EMP_PHONE: employee.empPhone,
    EMP_PAN: employee.empPan,
    EMP_TYPE: employee.empType,
    EMP_PERMISSION: employee.empPermission,
    EMP_BASE_SALARY: employee.empBaseSalary,
  });

  // save user
  await newEmployee.save();
  return newEmployee.EMP_ID;
}

async function getAllEmployee() {
  const allEmployees = await db.Employee.findAll();

  return allEmployees;
}

module.exports = {
  createEmployee,
  getAllEmployee,
};
