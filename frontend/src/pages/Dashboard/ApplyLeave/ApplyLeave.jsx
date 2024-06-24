import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SectionHeading from "../../../components/Heading/SectionHeading";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import {
  checkDatesAndDifference,
  getCurrentDateFormatted,
  isDateMoreThan7DaysFromNow,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiToken = sessionStorage.getItem("lsm_token");

const ApplyLeave = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState("");
  const [singleLeaveDate, setSingleLeaveDate] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const handleLeaveStartDate = (e) => {
    if (isDateMoreThan7DaysFromNow(e.target.value)) {
      setLeaveStartDate(e.target.value);
    } else {
      enqueueSnackbar("Leave can only be applied in 7 days advance", {
        variant: "error",
      });
    }
  };

  const handleLeaveEndDate = (e) => {
    if (
      leaveStartDate !== "" &&
      checkDatesAndDifference(leaveStartDate, e.target.value)
        .isSecondDateAfterFirst
    ) {
      const dateDiff = checkDatesAndDifference(leaveStartDate, e.target.value);
      console.log("checkDatesAndDifference-->", dateDiff);
      console.log("date difference-->", dateDiff.daysDifference + 1);
      setLeaveEndDate(e.target.value);
    } else {
      enqueueSnackbar("Leave End date should be after leave start date", {
        variant: "error",
      });
    }
  };

  const handleLeaveApplicationSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("lsm_user"));
    const payload = {
      leaveType,
      leaveApplyDate: getCurrentDateFormatted(),
      singleLeaveDate,
      leaveStartDate,
      leaveEndDate,
      leaveReason,
      leaveStatus: "pending",
      leaveApplierId: user.empId,
    };
    if (leaveType === "Long-leave") {
      delete payload.singleLeaveDate;
    } else if (leaveType === "One-day" || leaveType === "Half-day") {
      delete payload.leaveStartDate;
      delete payload.leaveEndDate;

      payload.leaveStartDate = singleLeaveDate;
      payload.leaveEndDate = null;

      delete payload.singleLeaveDate;
    }
    console.log("payload-->", payload);

    const options = {
      method: "POST",
      url: `${apiUrl}/leave/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      data: payload,
    };

    console.log("api call started");
    axios
      .request(options)
      .then((response) => {
        console.log("create leave api resp-->", response.data);
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });
        navigate("/dashboard/leave-history");
      })
      .catch((error) => {
        console.error("create leave api error-->", error);
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        console.log("api call ended");
      });
  };
  return (
    <>
      <div className="w-full px-8 py-5 flex flex-col items-center gap-5">
        <SectionHeading heading="Apply for leave" />
        <form
          className="w-full space-y-7"
          onSubmit={handleLeaveApplicationSubmit}
        >
          <FormControl required size="small" fullWidth>
            <InputLabel variant="standard">Leave Type</InputLabel>
            <Select
              variant="standard"
              label="Leave Type"
              defaultValue={""}
              name="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <MenuItem disabled value="">
                <em>Select one leave type</em>
              </MenuItem>
              <MenuItem value="Half-day">Half-day</MenuItem>
              <MenuItem value="One-day">One-day</MenuItem>
              <MenuItem value="Long-leave">Long-Leave</MenuItem>
            </Select>
          </FormControl>
          {leaveType !== "" ? (
            <>
              {leaveType === "Long-leave" ? (
                <div className="w-full flex items-center gap-5">
                  <TextField
                    required
                    margin="dense"
                    label="Leave Start Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="leaveStartDate"
                    value={leaveStartDate}
                    onChange={handleLeaveStartDate}
                  />
                  --
                  <TextField
                    required
                    margin="dense"
                    label="Leave End Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="leaveEndDate"
                    value={leaveEndDate}
                    onChange={handleLeaveEndDate}
                  />
                </div>
              ) : (
                <TextField
                  required
                  margin="dense"
                  label="Leave Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="singleLeaveDate"
                  value={singleLeaveDate}
                  onChange={(e) => {
                    if (isDateMoreThan7DaysFromNow(e.target.value)) {
                      setSingleLeaveDate(e.target.value);
                    } else {
                      enqueueSnackbar(
                        "Leave can only be applied in 7 days advance",
                        {
                          variant: "error",
                        }
                      );
                    }
                  }}
                />
              )}
              <TextField
                required
                margin="dense"
                label="Leave reason"
                placeholder="Describe your leave reason in brief here..."
                type="text"
                multiline
                rows={7}
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                name="leaveReason"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
              />
              <div className="w-full flex items-center justify-end">
                <Button color="success" type="submit">
                  Submit Leave Application
                </Button>
              </div>
            </>
          ) : (
            <div>
              <p className="text-red-600">Please select a leave type</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ApplyLeave;
