import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const payload = {
      empEmail: userEmail,
      empPassword: userPassword,
    };

    console.log("payload", payload);

    const options = {
      method: "POST",
      url: `${apiUrl}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    console.log("api call started");
    axios
      .request(options)
      .then((response) => {
        console.log("login api resp-->", response.data);
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });

        const apiLoginResp = response.data;
        const loginToken = response.data.token;
        delete apiLoginResp.message;
        delete apiLoginResp.token;

        sessionStorage.setItem("lsm_user", JSON.stringify(apiLoginResp));
        sessionStorage.setItem("lsm_token", loginToken);

        navigate("/dashboard/apply-leave");
      })
      .catch((error) => {
        console.error("login api error-->", error);
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        console.log("api call ended");
      });
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("lsm_token") &&
      sessionStorage.getItem("lsm_user")
    ) {
      navigate("/dashboard/apply-leave");
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-full border px-6 py-10 max-w-[500px] flex flex-col items-center justify-center gap-5"
        onSubmit={handleLoginSubmit}
      >
        <p className="w-full text-xl my-2">Salary Leave Management System</p>
        <TextField
          label="Company Email"
          placeholder="Enter your email"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter your password"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
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
        <div className="w-full flex items-center -my-3">
          <FormControlLabel
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
            control={<Checkbox />}
            label="Remember Me"
          />
        </div>
        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
