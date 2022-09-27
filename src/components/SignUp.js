import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Grid,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import googleImage from "../asset/google.png";
import facebookImage from "../asset/facebook.png";
import rocketImage from "../asset/rocket-launch.png";
import "./SignUp.css";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAdded } from "../redux/features/register/registerSlice";
import { loginedUser } from "../redux/features/register/loginSlice";

const SignUp = () => {
  const fontFamilyName =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

  //const users = useSelector((state) => state.register.registeredUsers)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState(() => {
    return {
      name: "",
      email: "",
      password: "",
      acceptTnC: false,
    };
  });
  const initialFormErrors = {};
  const [formError, setFormError] = useState(() => initialFormErrors);
  const [isSubmit, setIsSubmit] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setSignUpData((prevSignUpData) => {
      switch (name) {
        case "acceptTnC":
          return { ...prevSignUpData, [name]: event.target.checked };
        default:
          return { ...prevSignUpData, [name]: value };
      }
    });
    
  };

  useEffect(() => {
    // isSubmit.current = false
    
  }, [signUpData]);

  const checkForValidation = () => {
    const errors = {};

    if (signUpData.name.length === 0 && !signUpData.name) {
      errors.nameError = "Name is required";
    }

    if (signUpData.email.length === 0) {
      errors.emailError = "Email is required";
    } else if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(signUpData.email)
    ) {
      errors.emailError = "Wrong Email format";
    }

    if (signUpData.password.length === 0) {
      errors.passwordError = "Password is required";
    } else if (signUpData.password.length < 6) {
      errors.passwordError = "Password can not be less than 6 characters";
    } else if (signUpData.password.length > 15) {
      errors.passwordError = "Password can not exceed more than 15 characters";
    }
    return errors;
  };

  const submit = (event) => {
    event.preventDefault();
    setIsSubmit(true)
    setFormError(checkForValidation());
    console.log("isSubmit =",isSubmit)
    console.log("formError =", formError)
    if (Object.keys(formError).length === 0 && signUpData.name.length!==0 && signUpData.email.length!==0 && signUpData.password.length!==0  && isSubmit) {
      if (signUpData.acceptTnC) {
        dispatch(userAdded(signUpData));
        dispatch(
          loginedUser({
            email: signUpData.email,
          })
        );
        navigate("/home");
      } else {
        alert("Please read and accept terms and condition");
      }
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
              Sign Up
            </Box>
          </Stack>
          <Stack spacing={2} py={4}>
            <h2 className="sign-up-with">Sign up with</h2>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                height: "fit-content",
                borderRadius: "10px",
                border: "2px solid #eeeeee",
                fontSize: "13px",
                fontWeight: "500",
                color: "rgba(0, 0, 0, 0.87)",
                fontFamily: fontFamilyName,
              }}
              startIcon={
                <Avatar
                  src={googleImage}
                  sx={{ height: "20px", width: "20px", marginRight: "5px" }}
                ></Avatar>
              }
            >
              Sign up with Google
            </Button>
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                height: "fit-content",
                borderRadius: "10px",
                border: "2px solid #eeeeee",
                fontSize: "13px",
                fontWeight: "500",
                color: "rgba(0, 0, 0, 0.87)",
                fontFamily: fontFamilyName,
              }}
              startIcon={
                <Avatar
                  src={facebookImage}
                  sx={{ height: "20px", width: "20px", marginRight: "5px" }}
                ></Avatar>
              }
            >
              Sign up with Facebook
            </Button>
          </Stack>

          {/* Form starts from here */}
          <form autoComplete="off" onSubmit={submit}>
            <Grid container my={3} rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack direction={"column"} spacing={1}>
                  <label className="input-labels">Name</label>
                  <input
                    type="text"
                    value={signUpData.name}
                    onChange={handleChange}
                    className="signup-input"
                    name="name"
                    autoComplete="off"
                  />
                  <p className="errorMsg">
                    {formError.nameError ? formError.nameError : null}
                  </p>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction={"column"} spacing={1}>
                  <label className="input-labels">Email</label>
                  <input
                    type="text"
                    value={signUpData.email}
                    onChange={handleChange}
                    className="signup-input"
                    name="email"
                    autoComplete="off"
                  />
                  <p className="errorMsg">
                    {formError.emailError ? formError.emailError : null}
                  </p>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack direction={"column"} spacing={1}>
                  <label className="input-labels">Password</label>
                  <input
                    type="password"
                    value={signUpData.password}
                    onChange={handleChange}
                    className="signup-input"
                    name="password"
                    autoComplete="off"
                  />
                  <p className="errorMsg">
                    {formError.passwordError ? formError.passwordError : null}
                  </p>
                </Stack>
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ width: "80%", float: "left", textAlign: "left" }}
                  label={
                    <Typography
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        fontFamily: fontFamilyName,
                      }}
                    >
                      I've read and agree with Terms of Service and our Privacy
                      Policy
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={signUpData.acceptTnC}
                      onChange={handleChange}
                      name="acceptTnC"
                      style={{
                        color: signUpData.acceptTnC ? "#FF5349" : "#eeeeee",
                      }}
                    />
                  }
                ></FormControlLabel>
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
              Already have an account ?{"  "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Box component={"span"} className="sign-in-link">
                  Sign in
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

export default SignUp;
