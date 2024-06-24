import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "./App.css";
import Login from "./pages/Login/Login";
import Landing from "./pages/Dashboard/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Dashboard/Employee/Employee";
import ApplyLeave from "./pages/Dashboard/ApplyLeave/ApplyLeave";
import LeaveHistory from "./pages/Dashboard/LeaveHistory/LeaveHistory";
import SalaryHistory from "./pages/Dashboard/SalaryHistory/SalaryHistory";

const App = () => {
  return (
    <div className="ubuntu">
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transitionDuration={200}
        autoHideDuration={1000}
        preventDuplicate={true}
      />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Landing />} />
          <Route path="employee" element={<Employee />} />
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="leave-history" element={<LeaveHistory />} />
          <Route path="salary-history" element={<SalaryHistory />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
