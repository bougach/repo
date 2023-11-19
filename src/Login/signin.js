import React, { useState } from "react";
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
  ThemeProvider,
  Typography,
  createTheme,
  Select,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import MailLockIcon from "@mui/icons-material/MailLock";
import { Link, useNavigate } from "react-router-dom";
import { VisibilityOff, VisibilityOutlined } from "@mui/icons-material";
import customFetch from "../Componnemts/customFetch";

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
};

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cohortStartDate, setCohortStartDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState(""); 
  const [role, setRole] = useState(""); 

  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const sendLoginRequest = async () => {
    const user = {
      username: userName,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      cohortStartDate: cohortStartDate,
      imageUrl: imageUrl,
      gender: gender,
      role: role,
    };
    const response = customFetch("/api/auth/register", "POST", null, user);
    console.log(response);

    navigate("/");
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
              "url(https://source.unsplash.com/featured/1920x1080/?technology)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid  bgcolor={"#E6F0FF"} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Join oussama's App
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
              Already have an account?{" "}
              <Link to="/login" variant="body2">
                Login
              </Link>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-username">
                  Username
                </InputLabel>
                <Input
                  id="standard-adornment-username"
                  type="text"
                  name="username"
                  size="small"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                        <PersonIcon/>
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
                        {showPassword ? <VisibilityOff/> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-email">
                  Email
                </InputLabel>
                <Input
                  id="standard-adornment-email"
                  type="email"
                  name="email"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-firstname">
                  First Name
                </InputLabel>
                <Input
                  id="standard-adornment-firstname"
                  type="text"
                  name="firstname"
                  size="small"
                  fullWidth
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-lastname">
                  Last Name
                </InputLabel>
                <Input
                  id="standard-adornment-lastname"
                  type="text"
                  name="lastname"
                  size="small"
                  fullWidth
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <Input
                  id="standard-adornment-cohort-start-date"
                  type="date"
                  name="cohortstartdate"
                  size="small"
                  fullWidth
                  value={cohortStartDate}
                  onChange={(event) => setCohortStartDate(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-image-url">
                  Image URL
                </InputLabel>
                <Input
                  id="standard-adornment-image-url"
                  type="text"
                  name="imageurl"
                  size="small"
                  fullWidth
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-gender">Gender</InputLabel>
                <Select
                  id="standard-adornment-gender"
                  name="gender"
                  size="small"
                  fullWidth
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <MenuItem value="male">male</MenuItem>
                  <MenuItem value="female">female</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="standard-adornment-role">Role</InputLabel>
                <Select
                  id="standard-adornment-role"
                  name="role"
                  size="small"
                  fullWidth
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="CODE_REVIEWER">Code Reviewer</MenuItem>
                  <MenuItem value="STUDENT">STUDENTr</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                onClick={() => sendLoginRequest()}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
