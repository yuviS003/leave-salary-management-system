const leaveService = require("../services/Leave.service.js");
const express = require("express");
const router = express.Router();

// Example route
router.get("/", getAllLeaves);
router.get("/getByUserId/:userId", getAllLeavesByUserId);
router.post("/create", createLeave);
router.post("/updateLeaveStatus", updateLeaveStatus);

function getAllLeaves(req, res, next) {
  leaveService
    .getAllLeaves()
    .then((allLeaves) => {
      const modifiedLeaveData = allLeaves.map((leave) => {
        return {
          leaveId: leave.LEAVE_ID,
          leaveApplierId: leave.LEAVE_APPLIER_ID,
          leaveType: leave.LEAVE_TYPE,
          leaveApplyDate: leave.LEAVE_APPLY_DATE,
          leaveStartDate: leave.LEAVE_START_DATE,
          leaveEndDate: leave.LEAVE_END_DATE,
          leaveReason: leave.LEAVE_REASON,
          leaveStatus: leave.LEAVE_STATUS,
          leaveApprovalDate: leave.LEAVE_APPROVAL_DATE,
          leaveApproverId: leave.LEAVE_APPROVER_ID,
          leaveCreatedAt: leave.createdAt,
          leaveUpdatedAt: leave.updatedAt,
        };
      });

      res.json(modifiedLeaveData);
    })
    .catch(next);
}

function getAllLeavesByUserId(req, res, next) {
  leaveService
    .getAllLeavesByUserId(req.params)
    .then((allLeaves) => {
      const modifiedLeaveData = allLeaves.map((leave) => {
        return {
          leaveId: leave.LEAVE_ID,
          leaveApplierId: leave.LEAVE_APPLIER_ID,
          leaveType: leave.LEAVE_TYPE,
          leaveApplyDate: leave.LEAVE_APPLY_DATE,
          leaveStartDate: leave.LEAVE_START_DATE,
          leaveEndDate: leave.LEAVE_END_DATE,
          leaveReason: leave.LEAVE_REASON,
          leaveStatus: leave.LEAVE_STATUS,
          leaveApprovalDate: leave.LEAVE_APPROVAL_DATE,
          leaveApproverId: leave.LEAVE_APPROVER_ID,
          leaveCreatedAt: leave.createdAt,
          leaveUpdatedAt: leave.updatedAt,
        };
      });

      res.json(modifiedLeaveData);
    })
    .catch(next);
}

function createLeave(req, res, next) {
  leaveService
    .createLeave(req.body)
    .then((newLeaveId) =>
      res.json({ message: "Leave Created successfully", newLeaveId })
    )
    .catch(next);
}

function updateLeaveStatus(req, res, next) {
  leaveService
    .updateLeaveStatus(req.body)
    .then(() => res.json({ message: "Leave Status Updated successfully" }))
    .catch(next);
}

module.exports = router;
