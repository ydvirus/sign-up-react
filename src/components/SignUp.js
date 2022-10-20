/* eslint-disable no-useless-escape */
import React, { useState } from "react";
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
import "./SignUp.css";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAdded } from "../redux/features/register/registerSlice";
import { loginedUser } from "../redux/features/register/loginSlice";
import InputField from "./InputField";

const SignUp = () => {
  const fontFamilyName =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTnC: false,
  });

  const inputFields = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      errorMsg: "* Only alphabetic names allowed with atleast 3 characters",
      smValue: 6,
      mdValue: 6,
      className: "signup-input name-input",
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "* Invalid email format",
      smValue: 6,
      mdValue : 6,
      className: "signup-input email-input",
      //pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$",
      pattern: "^[a-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$",
      required: true,
    },
    {
      id: "password",
      name: "password",
      label: "Password",
      type: "password",
      errorMsg:
        "* Password size should be between 8-15 characters with atleast 1 small , 1 capital and 1 number",
      smValue: 12,
      mdValue: 12,
      className: "signup-input password-input",
      pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$", // Minimum eight characters, at least one letter(small and capital) and one number
      required: true,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpData((prevSignUpData) => {
      console.log("name property = ", name);
      switch (name) {
        case "acceptTnC":
          return { ...prevSignUpData, [name]: event.target.checked };
        default:
          return { ...prevSignUpData, [name]: value };
      }
    });
  };

  const submit = (event) => {
    event.preventDefault();
    console.log(event);
    if (
      signUpData.name.length !== 0 &&
      signUpData.email.length !== 0 &&
      signUpData.password.length !== 0 &&
      signUpData.acceptTnC
    ) {
      dispatch(userAdded(signUpData));
      dispatch(
        loginedUser({
          email: signUpData.email,
        })
      );
      navigate("/home");
    }
  };

  return (
    <Paper className="paper" elevation={4}>
      <Grid container direction={"row"}>
        <Grid item sm={12} md={6} className="left-content">
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
          <Stack sx={{width: "100%"}}>
            <Grid container mb={3} rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12} sm={6} md={6}>
              <Stack direction={"column"} spacing={1}>
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
                    width: "100%"
                  }}
                  startIcon={
                    <Avatar
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      }
                      sx={{ height: "20px", width: "20px", marginRight: "5px" }}
                    ></Avatar>
                  }
                >
                  Sign up with Google
                </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
              <Stack direction={"column"} spacing={1}>
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
                    width: "100%"
                  }}
                  startIcon={
                    <Avatar
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      }
                      sx={{ height: "20px", width: "20px", marginRight: "5px" }}
                    ></Avatar>
                  }
                >
                  Sign up with Facebook
                </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          {/* Form starts from here */}
          <form autoComplete="off" onSubmit={submit}>
            <Grid container my={3} rowSpacing={3} columnSpacing={3}>
              {inputFields.map((input) => (
                <InputField
                  key={input.id}
                  {...input}
                  value={signUpData[input.name]}
                  onChange={handleChange}
                />
              ))}

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
                      required
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

        <Grid item sm={12} md={6} className="right-content">
          <Box>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/2/22/Noun_598870_cc_rocket.svg"
              }
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
