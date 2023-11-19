import {
  Button,
  Card,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PasswordTextf from "../../Componnemts/password/passwordtextfiled";

const style = {
  marginTop: 20,
  marginBottom: 20,
  display: "block",
};

const paperStyle = {
  border: `1px solid ${"#42a5f5"}`,
  borderRadius: 8,
  padding: 20,
  width: 400,
  height: "60vh",
  margin: "auto",
};

export default function Create() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      display="flex"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Stack direction="row">
        <Box sx={{ marginRight: "70px" }}>
          <img src="https://media.istockphoto.com/vectors/add-user-icon-trendy-add-user-logo-concept-on-white-background-from-vector-id1127341760?k=20&m=1127341760&s=170667a&w=0&h=HSv-BtHhJlvhOqqSWqfs_PJcMvlgwii1iW-LDS1Ivnc=" />
        </Box>

        <Paper elevation={10} style={paperStyle}>
          <Typography
            sx={{
              marginTop: "10px",
              fontWeight: "bolder",
              fontFamily: "cursive",
              fontSize: "20px",
              color: "#ba68c8",
            }}
            align="center"
            variant="h6"
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Add New Agent :{" "}
          </Typography>

          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              style={style}
              label="Username"
              variant="standard"
              color="secondary"
              required
            />
            <PasswordTextf />
            <FormControl
              color="secondary"
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
              fullWidth
            >
              <InputLabel variant="standard">Role</InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "Role",
                }}
              >
                <option value={"superUser"}>Superuser </option>
                <option value={"admine"}>Admine </option>
              </NativeSelect>
            </FormControl>
            <Typography align="center">
              <Button
                sx={{ marginTop: "40px" }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Submit
              </Button>
            </Typography>
          </form>
        </Paper>
      </Stack>
    </Grid>
  );
}
