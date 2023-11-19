import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";

export default function PasswordTextf(props) {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [pass, setpass] = useState("");

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onpass = (e) => {
    setpass(e.target.value);
  };
  return (
    <FormControl
      sx={{
        marginTop: "5px",
        marginBottom: "20px",
        display: "block",
      }}
      fullWidth
      variant="standard"
    >
      <InputLabel color="secondary">Password</InputLabel>
      <Input
        width="300"
        fullWidth
        onChange={onpass}
        helperText={!pass ? "required" : " do not share your pass"}
        required
        color="secondary"
        error={!pass}
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
