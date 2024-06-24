const employeeService = require("../services/Employee.service.js");
const express = require("express");
const router = express.Router();

// Example route
router.get("/", getAllEmployee);
router.post("/create", createEmployee);

function getAllEmployee(req, res, next) {
  employeeService
    .getAllEmployee()
    .then((allEmployees) => {
      const modifiedEmployeeData = allEmployees.map((employee) => {
        return {
          empId: employee.EMP_ID,
          empName: employee.EMP_NAME,
          empEmail: employee.EMP_EMAIL,
          empDob: employee.EMP_DOB,
          empPhone: employee.EMP_PHONE,
          empPan: employee.EMP_PAN,
          empType: employee.EMP_TYPE,
          empPermission: employee.EMP_PERMISSION,
          empBaseSalary: employee.EMP_BASE_SALARY,
          empCreatedAt: employee.createdAt,
          empUpdatedAt: employee.updatedAt,
        };
      });

      res.json(modifiedEmployeeData);
    })
    .catch(next);
}

function createEmployee(req, res, next) {
  employeeService
    .createEmployee(req.body)
    .then((newEmployeeId) =>
      res.json({ message: "New Employee created", newEmployeeId })
    )
    .catch(next);
}

module.exports = router;
