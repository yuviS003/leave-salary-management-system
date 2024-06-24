import { useEffect, useState } from "react";
import SectionHeading from "../../../components/Heading/SectionHeading";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import SalaryTable from "../../../components/DataGrids/SalaryTable/SalaryTable";
import { Button } from "@mui/material";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiToken = sessionStorage.getItem("lsm_token");

const SalaryHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [salaryData, setSalaryData] = useState({
    salaryData: [],
    salaryOptions: {},
  });

  const fetchAllSalary = () => {
    const options = {
      method: "GET",
      url: `${apiUrl}/salary/getAllEmpSalary`,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    console.log("api call started");
    setIsLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log("salary fetch api resp-->", response.data);
        setSalaryData(response.data);
      })
      .catch((error) => {
        console.error("salary fetch api error-->", error);
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
    fetchAllSalary();
  }, []);
  return (
    <div className="w-full px-8 py-5 flex flex-col items-center gap-5">
      <SectionHeading heading="Salary History" />
      <div className="w-full flex items-center justify-end gap-5">
        <Button sx={{ color: "GrayText" }} onClick={fetchAllSalary}>
          Refresh
        </Button>
      </div>
      <SalaryTable isLoading={isLoading} salaryData={salaryData} />
      <div className="w-full flex text-xs items-center justify-end gap-2 italic">
        <div>TDS: {salaryData.salaryOptions?.TDS}%;</div>
        <div>
          Long Leave Deduction:
          {salaryData.salaryOptions?.LONG_LEAVE_DEDUCTION}Rs per Leave;
        </div>
        <div>
          Short Leave Deduction:
          {salaryData.salaryOptions?.SHORT_LEAVE_DEDUCTION}Rs per Leave;
        </div>
        <div>No Leave Bonus: {salaryData.salaryOptions?.NO_LEAVE_BONUS}Rs;</div>
      </div>
      <div className="w-full flex text-xs items-center justify-end gap-2 italic -mt-4">
        Total Salary = Base Salary - Long Leave Deduction - Short Leave
        Deduction - TDS + Bonus
      </div>
    </div>
  );
};

export default SalaryHistory;
