import PeopleIcon from "@mui/icons-material/People";
import ApprovalIcon from "@mui/icons-material/Approval";
import HistoryIcon from "@mui/icons-material/History";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarLabel = ({ btnText, btnIcon, navigateTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button
      className={`w-full flex items-center justify-center gap-2 text-white ${
        location.pathname === navigateTo ? "bg-secondary" : "bg-none"
      } py-2 rounded-md cursor-pointer transition`}
      onClick={() => navigate(navigateTo)}
    >
      {btnIcon}
      <span>{btnText}</span>
    </button>
  );
};

const Sidebar = () => {
  const userData = JSON.parse(sessionStorage.getItem("lsm_user"));
  return (
    <div className="h-[calc(100vh-80px)] w-[270px] overflow-y-auto bg-primary py-5 px-3 gap-5 space-y-5">
      <SidebarLabel
        btnText={"Apply Leave"}
        btnIcon={<ApprovalIcon />}
        navigateTo={"/dashboard/apply-leave"}
      />
      <SidebarLabel
        btnText={"Leave History"}
        btnIcon={<HistoryIcon />}
        navigateTo={"/dashboard/leave-history"}
      />
      {userData?.empPermission && userData?.empPermission === "Admin" && (
        <>
          <SidebarLabel
            btnText={"Employees"}
            btnIcon={<PeopleIcon />}
            navigateTo={"/dashboard/employee"}
          />
          <SidebarLabel
            btnText={"Salary History"}
            btnIcon={<CurrencyRupeeIcon />}
            navigateTo={"/dashboard/salary-history"}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
