import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="sticky top-0 left-0 z-[100] w-full bg-primary text-white h-[80px] px-8 flex items-center justify-between border-b-[6px] border-secondary">
      <img src="/logo.png" alt="logo" className="w-44 object-cover" />
      <IconButton onClick={logout}>
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default AppBar;
