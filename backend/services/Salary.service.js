const db = require("../db/db.js");
const salaryOptions = require("../configs/salaryConfig.json");

async function getAllEmpSalary() {
  const Employee = await db.Employee.findAll();
  const Leave = await db.Leave.findAll();

  const modifiedEmpData = Employee.map((emp) => {
    return {
      empId: emp.EMP_ID,
      empName: emp.EMP_NAME,
      empEmail: emp.EMP_EMAIL,
      empBaseSalary: emp.EMP_BASE_SALARY,
    };
  });

  const mergedEmpLeaveData = modifiedEmpData.map((emp) => {
    const leaveData = Leave.filter(
      (leave) => leave.LEAVE_APPLIER_ID === emp.empId
    );
    return { ...emp, leaveData };
  });

  const salaryData = mergedEmpLeaveData.map((emp) => {
    if (emp.leaveData.length === 0) {
      return {
        empId: emp.empId,
        empName: emp.empName,
        empEmail: emp.empEmail,
        shortLeaveCount: 0,
        longLeaveCount: 0,
        totalLeaveCount: 0,
        empBaseSalary: Number(emp.empBaseSalary),
        empShortLeaveDeduction: Number(salaryOptions.SHORT_LEAVE_DEDUCTION) * 0,
        empLongLeaveDeduction: Number(salaryOptions.LONG_LEAVE_DEDUCTION) * 0,
        empTdsDeduction:
          (Number(salaryOptions.TDS) / 100) * Number(emp.empBaseSalary),
        empBonus: Number(salaryOptions.NO_LEAVE_BONUS),
        empTotalSalary:
          Number(emp.empBaseSalary) -
          (Number(salaryOptions.TDS) / 100) * Number(emp.empBaseSalary) +
          Number(salaryOptions.NO_LEAVE_BONUS),
      };
    } else {
      let shortLeaveCount = 0;
      let longLeaveCount = 0;
      emp.leaveData.forEach((leave) => {
        if (leave.LEAVE_TYPE === "Long-leave") {
          longLeaveCount++;
        } else {
          shortLeaveCount++;
        }
      });
      return {
        empId: emp.empId,
        empName: emp.empName,
        empEmail: emp.empEmail,
        shortLeaveCount,
        longLeaveCount,
        totalLeaveCount: shortLeaveCount + longLeaveCount,
        empBaseSalary: Number(emp.empBaseSalary),
        empShortLeaveDeduction:
          Number(salaryOptions.SHORT_LEAVE_DEDUCTION) * shortLeaveCount,
        empLongLeaveDeduction:
          Number(salaryOptions.LONG_LEAVE_DEDUCTION) * longLeaveCount,
        empTdsDeduction:
          (Number(salaryOptions.TDS) / 100) * Number(emp.empBaseSalary),
        empBonus: 0,
        empTotalSalary:
          Number(emp.empBaseSalary) -
          (Number(salaryOptions.TDS) / 100) * Number(emp.empBaseSalary) -
          Number(salaryOptions.SHORT_LEAVE_DEDUCTION) * shortLeaveCount -
          Number(salaryOptions.LONG_LEAVE_DEDUCTION) * longLeaveCount,
      };
    }
  });

  return { salaryOptions, salaryData };
}

module.exports = { getAllEmpSalary };
