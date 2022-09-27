import React, { useState } from "react";
import {
  Paper,
  Grid,
  Button,
  Stack,
  Box
} from "@mui/material";
import rocketImage from "../asset/rocket-launch.png";
import "./Login.css";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginedUser } from "../redux/features/register/loginSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registeredUsers = useSelector(
    (state) => state.register.registeredUsers
  );
  const [loginData, setLoginData] = useState(() => {
    return {
      email: "",
      password: "",
    };
  });
  const handleChange = (event) => {
    setLoginData((prevLoginData) => {
      // console.log("Previous state=", prevSignUpData);
      switch (event.target.name) {
        case "email":
          return { ...prevLoginData, email: event.target.value };
        case "password":
          return { ...prevLoginData, password: event.target.value };
        default:
          break;
      }
    });
  };
  const submit = (event) => {
    event.preventDefault();
    console.log(loginData);
    
    const registeredUser = registeredUsers.find(
      (item) =>
        item.email === loginData.email && item.password === loginData.password
    );
    if (registeredUser) {
      dispatch(loginedUser({ email: loginData.email }));
      navigate("/home");
    }else{
        alert("User not registered !!")
    }
  };

  return (
    <Paper
      sx={{
        padding: "60px",
        margin: "60px",
        height: "max",
        borderRadius: "25px",
        backgroundImage:
          "linear-gradient(34deg, rgba(255,255,255,1) 57%, rgba(234,234,255,1) 100%)",
      }}
      elevation={4}
    >
      <Grid container direction={"row"}>
        <Grid item sm={6}>
          <Stack spacing={2}>
            <Box
              component={"h1"}
              sx={{
                color: "#1a237e",
                width: "max-content",
                fontWeight: "700",
                fontSize: "50px",
                margin: "0",
              }}
            >
              Login
            </Box>
          </Stack>

          <form autoComplete="off" onSubmit={submit}>
            <Grid container my={3} rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12} sm={8}>
                <Stack direction={"column"} spacing={1}>
                  <label className="input-labels">Email</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="signup-input"
                    name="email"
                    autoComplete="off"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Stack direction={"column"} spacing={1}>
                  <label className="input-labels">Password</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="signup-input"
                    name="password"
                    autoComplete="off"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={1} sm={2}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    borderRadius: "25px",
                    backgroundColor: "#FF5349",
                    margin: "0",
                    "&:hover": { backgroundColor: "#FF5349" },
                  }}
                  className="submit-button"
                  startIcon={<EastIcon />}
                ></Button>
              </Grid>
            </Grid>
          </form>

          <Stack spacing={2} py={4}>
            <Box className="have-account">
              Do not have an account ?{"  "}
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                <Box component={"span"} className="sign-in-link">
                  Sign up
                </Box>
              </Link>
            </Box>
          </Stack>
        </Grid>

        <Grid item sm={6}>
          <Box>
            <img
              src={rocketImage}
              className="rocket-launch-image"
              alt="rocketImage"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
