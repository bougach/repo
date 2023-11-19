import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Snackbar,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocalState } from "../Componnemts/localStorage/useLocalstorage";
import LockIcon from "@mui/icons-material/Lock";
import customFetch from "../Componnemts/customFetch";
import mylogo from "../assets/imgs/bg/mylogoo.png"

const Loging = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const showErrorSnackbar = (message) => {
    setIsError(true);
    setErrorMessage(message);
  };

  const handleCloseSnackbar = () => {
    setIsError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendLogingRequest = async () => {
    const user = {
      username: userName,
      password: password,
    };

    try {
      const data = await customFetch("/api/auth/authenticate", "POST", jwt, user);
      const access = data.access_token;
      setJwt(access);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching data:", error);
      showErrorSnackbar("Invalid username or password. Please try again.");
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid bgcolor={"#E6F0FF"} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
        <img src={mylogo} alt="My Logo" style={{ width: "100px", height: "100px", marginBottom: "16px" }} />
            <Typography component="h1" variant="h5">
              log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  UserName{" "}
                </InputLabel>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                onClick={() => sendLogingRequest()}
              >
                {" "}
                Login{" "}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/Forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/SignIn" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </ThemeProvider>
  );
};

export default Loging;
