const db = require("../db/db.js");

async function createLeave(reqBody) {
  console.log("reqBody-->", reqBody);

  const newLeave = await new db.Leave({
    LEAVE_APPLIER_ID: reqBody.leaveApplierId,
    LEAVE_TYPE: reqBody.leaveType,
    LEAVE_APPLY_DATE: reqBody.leaveApplyDate,
    LEAVE_START_DATE: reqBody.leaveStartDate,
    LEAVE_END_DATE: reqBody.leaveEndDate === "" ? null : reqBody.leaveEndDate,
    LEAVE_REASON: reqBody.leaveReason,
    LEAVE_STATUS: reqBody.leaveStatus,
    LEAVE_APPROVAL_DATE: null,
    LEAVE_APPROVER_ID: null,
  });

  // save leave
  await newLeave.save();
  return newLeave.LEAVE_ID;
}

async function getAllLeaves() {
  const allLeaves = await db.Leave.findAll();

  return allLeaves;
}

async function getAllLeavesByUserId(reqParams) {
  console.log("reqParams-->", reqParams);
  const { userId } = reqParams;

  const allLeaves = await db.Leave.findAll({
    where: {
      LEAVE_APPLIER_ID: userId,
    },
  });

  return allLeaves;
}

async function updateLeaveStatus(reqBody) {
  console.log("reqBody-->", reqBody);
  const { leaveId, leaveStatus, leaveApprovalDate, leaveApproverId } = reqBody;

  const leave = await db.Leave.findOne({
    where: {
      LEAVE_ID: leaveId,
    },
  });

  if (!leave) {
    throw new Error("Leave not found");
  }

  leave.LEAVE_STATUS = leaveStatus;
  leave.LEAVE_APPROVAL_DATE = leaveApprovalDate;
  leave.LEAVE_APPROVER_ID = leaveApproverId;

  await leave.save();

  return;
}

module.exports = {
  createLeave,
  getAllLeaves,
  getAllLeavesByUserId,
  updateLeaveStatus,
};
