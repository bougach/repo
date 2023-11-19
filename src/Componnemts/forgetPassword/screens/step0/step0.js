import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import forgetPassword from "../../../../assets/icons/forgetPassword.png";
import mailForgetpassBg from "../../../../assets/imgs/bg/mailForgetpassBg.jpg";
import customFetch from "../../../customFetch";
import { useNavigate } from "react-router-dom";

function Step0() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const paperStyle = {
    borderRadius: 10,
    padding: 30,
    width: "400px",
    background: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  };

  const handleForgotPassword = async () => {
    const request = {
      email: email,
    };

    try {
      var data = await customFetch(
        "/api/auth/forgotpassword",
        "POST",
        null,
        request
      );

      if (data && data.status === "success") {
        setIsSuccess(true);
        setErrorMessage("Password reset email sent successfully.");
      } else {
        setIsError(true);
        setErrorMessage("Password reset email not sent.");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("An error occurred while sending the email.");
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Grid container component="main">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${mailForgetpassBg})`,
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
                spacing={2}
                width={"400px"}
              >
                <Avatar src={forgetPassword} />
                <Typography variant="h6">Trouble Logging In?</Typography>
              </Stack>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Typography variant="caption">
                  Enter your email or username
                </Typography>
                <TextField
                  label="Email or username"
                  type="text"
                  name="username"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={handleForgotPassword}
                >
                  SEND
                </Button>
              </form>
              {isSubmitted && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: 10 }}
                >
                  Check your email for further instructions.
                </Typography>
              )}
              <Snackbar
                open={isSuccess || isError}
                autoHideDuration={5000}
                onClose={() => {
                  setIsSuccess(false);
                  setIsError(false);
                }}
                message={errorMessage}
              />
            </CardContent>
          </Card>
        </Box>{" "}
      </Grid>
    </Grid>
  );
}

export default Step0;
