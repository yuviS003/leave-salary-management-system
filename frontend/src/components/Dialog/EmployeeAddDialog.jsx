import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiToken = sessionStorage.getItem("lsm_token");

const employmentType = ["Full-time", "Part-time", "Intern", "Contract"];

const employeeType = ["Admin", "Employee"];

const EmployeeAddDialog = ({
  fetchAllEmployees,
  addEmpDialog,
  closeAddEmpDialog,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    empName: "",
    empEmail: "",
    empPassword: "",
    empConfirmPassword: "",
    empDob: "",
    empPhone: "",
    empPan: "",
    empType: "", // Full-time/Part-time/Intern/Contract
    empPermission: "", // Admin/Employee,
    baseSalary: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleNewEmpSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    if (employeeData.empPassword !== employeeData.empConfirmPassword) {
      enqueueSnackbar("Password and Confirm Password should be same", {
        variant: "error",
      });
      return;
    }
    const payload = {
      empName: employeeData.empName,
      empEmail: employeeData.empEmail,
      empPassword: employeeData.empPassword,
      empDob: employeeData.empDob,
      empPhone: employeeData.empPhone,
      empPan: employeeData.empPan,
      empType: employeeData.empType,
      empPermission: employeeData.empPermission,
      empBaseSalary: employeeData.baseSalary,
    };

    console.log("payload-->", payload);

    const options = {
      method: "POST",
      url: `${apiUrl}/employee/create`,
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
        console.log("create employee api resp-->", response.data);
        fetchAllEmployees();
        closeAddEmpDialog();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("create employee api error-->", error);
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        console.log("api call ended");
      });

    console.log("payload-->", payload);
    // closeAddEmpDialog();
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={addEmpDialog}
      onClose={closeAddEmpDialog}
      PaperProps={{
        component: "form",
        onSubmit: handleNewEmpSubmit,
      }}
      scroll={"paper"}
    >
      <DialogTitle>{"Create New Employee"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Employee Name"
          placeholder="Please enter your name"
          type="text"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          name="empName"
          value={employeeData.empName}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          label="Email Address"
          placeholder="Please enter email address"
          type="email"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          name="empEmail"
          value={employeeData.empEmail}
          onChange={handleChange}
        />
        <div className="flex items-center gap-5">
          <TextField
            label="New Password"
            placeholder="Enter new password"
            InputLabelProps={{ shrink: true }}
            required
            margin="dense"
            variant="standard"
            fullWidth
            type={showPassword ? "text" : "password"}
            name="empPassword"
            value={employeeData.empPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm New Password"
            placeholder="Confirm password"
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            margin="dense"
            variant="standard"
            type={showPassword ? "text" : "password"}
            name="empConfirmPassword"
            value={employeeData.empConfirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex items-center gap-5">
          <TextField
            required
            margin="dense"
            label="Contact Number"
            placeholder="Enter contact number"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            name="empPhone"
            value={employeeData.empPhone}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            name="empDob"
            value={employeeData.empDob}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-5">
          <TextField
            required
            margin="dense"
            label="PAN"
            placeholder="Enter PAN number"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            name="empPan"
            value={employeeData.empPan}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            label="Base Salary"
            placeholder="Enter Base Salary"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
            name="baseSalary"
            onChange={handleChange}
            value={employeeData.baseSalary}
          />
        </div>
        <div className="flex items-center gap-5 mt-2">
          <FormControl required size="small" fullWidth>
            <InputLabel variant="standard">Employment Type</InputLabel>
            <Select
              variant="standard"
              label="Employment Type"
              defaultValue={""}
              name="empType"
              value={employeeData.empType}
              onChange={handleChange}
            >
              <MenuItem disabled value="">
                <em>Select one employment type</em>
              </MenuItem>
              {employmentType.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required size="small" fullWidth>
            <InputLabel variant="standard">Employee Role</InputLabel>
            <Select
              variant="standard"
              label="Employee Role"
              defaultValue={""}
              name="empPermission"
              value={employeeData.empPermission}
              onChange={handleChange}
            >
              <MenuItem disabled value="">
                <em>Select one employee role</em>
              </MenuItem>
              {employeeType.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddEmpDialog}>cancel</Button>
        <Button type="submit" autoFocus>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeAddDialog;
