// Step2.js

import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import resetPasswordImage from "../../../../assets/imgs/bg/resetPassword.jpg";
import { Stack } from "@mui/system";
import customFetch from "../../../customFetch";
import { useParams } from "react-router-dom"; 

function Step2() {
  const avatarStyle = {
    backgroundColor: blue[500],
    width: 60,
    height: 60,
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); 
  console.log(token)

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await customFetch(`/api/auth/resetPassword/${token}`, "POST", null, {
          password: newPassword,
          confirmationPassword: confirmPassword,
        });
        console.log(response)

        if (response) {
          setMessage("Password reset successful.");
        } else {
          setMessage("An error occurred during password reset.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred during password reset.");
      }
    } else {
      setMessage("Passwords do not match.");
    }
  };

  return (
    <Grid container component="main">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${resetPasswordImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Card elevation={20}>
            <CardContent>
              <Stack
                display="flex"
                flexDirection="column"
                alignItems="center"
                spacing={3}
                width={"400px"}
              >
                <Avatar
                  style={avatarStyle}
                  src="https://img.icons8.com/fluency/2x/sign-in-form-password.png"
                />
                <Typography variant="h5">Reset Your Password</Typography>
                <TextField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  size="small"
                  fullWidth
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  size="small"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  helperText={!confirmPassword ? "Required" : "Do not share your password"}
                  required
                  error={!confirmPassword}
                  fullWidth
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
                {message && <Typography>{message}</Typography>}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Step2;
