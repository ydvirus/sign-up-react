import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import "./InputField.css";

function InputField(props) {
  const { smValue,mdValue, label, onChange, errorMsg,  ...other } = props;
  const [focused, setFocused] = useState(false);

  return (
    <>
    <Grid item xs={12} sm={smValue} md={mdValue}>
      <Stack direction={"column"} spacing={1}>
        <label className="input-labels" htmlFor={props.name}>{label}</label>
        <input
          onChange={onChange}
          {...other}
          autoComplete="off"
          onBlur={(e) => setFocused(true)}
          focused={focused.toString()}
        />
        <p className="errorMsg">{errorMsg && focused ? errorMsg : null}</p>
      </Stack>
    </Grid>
    </>    
  );
}

export default InputField;
