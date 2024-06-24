import { Button } from "@mui/material";
import SectionHeading from "../../../components/Heading/SectionHeading";
import LeaveTable from "../../../components/DataGrids/LeaveTable/LeaveTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getCurrentDateFormatted } from "../../../utils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiToken = sessionStorage.getItem("lsm_token");
const userData = JSON.parse(sessionStorage.getItem("lsm_user"));

const LeaveHistory = () => {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateLeaveStatus = (leave, leaveNewStatus) => {
    const user = JSON.parse(sessionStorage.getItem("lsm_user"));
    console.log("leave to be updated-->", leave);
    console.log("new status-->", leaveNewStatus);
    const payload = {
      leaveId: leave.leaveId,
      leaveStatus: leaveNewStatus,
      leaveApprovalDate: getCurrentDateFormatted(),
      leaveApproverId: user.empId,
    };

    console.log("payload-->", payload);

    setIsLoading(true);

    const options = {
      method: "POST",
      url: `${apiUrl}/leave/updateLeaveStatus`,
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
        console.log("update leave status api resp-->", response.data);
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });
        fetchAllLeaves();
      })
      .catch((error) => {
        console.error("update leave status api error-->", error);
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        console.log("api call ended");
        setIsLoading(false);
      });
  };

  const fetchAllLeaves = () => {
    const url =
      userData?.empPermission && userData?.empPermission === "Admin"
        ? `${apiUrl}/leave`
        : `${apiUrl}/leave/getByUserId/${userData?.empId}`;

    const options = {
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    console.log("api call started");
    setIsLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log("leave fetch api resp-->", response.data);
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error("leave fetch api error-->", error);
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        console.log("api call ended");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);
  return (
    <div className="w-full px-8 py-5 flex flex-col items-center gap-5">
      <SectionHeading heading="Leave History" />
      <div className="w-full flex items-center justify-end gap-5">
        <Button
          onClick={() => {
            navigate("/dashboard/apply-leave");
          }}
        >
          Apply For Leave
        </Button>
        <Button sx={{ color: "GrayText" }} onClick={fetchAllLeaves}>
          Refresh
        </Button>
      </div>
      <LeaveTable
        leaveData={leaveData}
        isLoading={isLoading}
        updateLeaveStatus={updateLeaveStatus}
      />
    </div>
  );
};

export default LeaveHistory;
