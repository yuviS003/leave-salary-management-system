const salaryService = require("../services/Salary.service.js");
const express = require("express");
const router = express.Router();

// Example route
router.get("/getAllEmpSalary", getAllEmpSalary);
// router.get("/getByUserId/:userId", getAllLeavesByUserId);

function getAllEmpSalary(req, res, next) {
  salaryService
    .getAllEmpSalary()
    .then((allSalary) => {
      res.json(allSalary);
    })
    .catch(next);
}

// function getAllLeavesByUserId(req, res, next) {
//   leaveService
//     .getAllLeavesByUserId(req.params)
//     .then((allLeaves) => {
//       const modifiedLeaveData = allLeaves.map((leave) => {
//         return {
//           leaveId: leave.LEAVE_ID,
//           leaveApplierId: leave.LEAVE_APPLIER_ID,
//           leaveType: leave.LEAVE_TYPE,
//           leaveApplyDate: leave.LEAVE_APPLY_DATE,
//           leaveStartDate: leave.LEAVE_START_DATE,
//           leaveEndDate: leave.LEAVE_END_DATE,
//           leaveReason: leave.LEAVE_REASON,
//           leaveStatus: leave.LEAVE_STATUS,
//           leaveApprovalDate: leave.LEAVE_APPROVAL_DATE,
//           leaveApproverId: leave.LEAVE_APPROVER_ID,
//           leaveCreatedAt: leave.createdAt,
//           leaveUpdatedAt: leave.updatedAt,
//         };
//       });

//       res.json(modifiedLeaveData);
//     })
//     .catch(next);
// }

module.exports = router;
