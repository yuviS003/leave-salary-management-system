import { Button } from "@mui/material";
import SectionHeading from "../../../components/Heading/SectionHeading";
import EmployeeTable from "../../../components/DataGrids/EmployeeTable/EmployeeTable";
import EmployeeAddDialog from "../../../components/Dialog/EmployeeAddDialog";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiToken = sessionStorage.getItem("lsm_token");

const Employee = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [empData, setEmpData] = useState([]);
  const [addEmpDialog, setAddEmpDialog] = useState(false);

  const openAddEmpDialog = () => {
    setAddEmpDialog(true);
  };

  const closeAddEmpDialog = () => {
    setAddEmpDialog(false);
  };

  const fetchAllEmployees = () => {
    const options = {
      method: "GET",
      url: `${apiUrl}/employee`,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    console.log("api call started");
    setIsLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log("employee fetch api resp-->", response.data);
        setEmpData(response.data);
      })
      .catch((error) => {
        console.error("employee fetch api error-->", error);
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
    fetchAllEmployees();
  }, []);
  return (
    <>
      <div className="w-full px-8 py-5 flex flex-col items-center gap-5">
        <SectionHeading heading="All Employees" />
        <div className="w-full flex items-center justify-end gap-5">
          <Button onClick={openAddEmpDialog}>Add Employee</Button>
          <Button sx={{ color: "GrayText" }} onClick={fetchAllEmployees}>
            Refresh
          </Button>
        </div>
        <EmployeeTable isLoading={isLoading} empData={empData} />
      </div>
      <EmployeeAddDialog
        fetchAllEmployees={fetchAllEmployees}
        addEmpDialog={addEmpDialog}
        openAddEmpDialog={openAddEmpDialog}
        closeAddEmpDialog={closeAddEmpDialog}
      />
    </>
  );
};

export default Employee;
