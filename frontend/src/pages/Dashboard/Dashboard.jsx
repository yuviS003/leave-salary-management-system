import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "../../components/Dashboard/AppBar";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !sessionStorage.getItem("lsm_token") &&
      !sessionStorage.getItem("lsm_user")
    ) {
      navigate("/");
    }
  }, []);
  return (
    <div className="">
      <AppBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="w-[calc(100vw-270px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
