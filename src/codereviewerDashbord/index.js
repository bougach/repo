import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLocalState } from "../Componnemts/localStorage/useLocalstorage";
import Popup from "../Componnemts/Popup";
import FormEdit from "../Componnemts/FormEdit";
import customFetch from "../Componnemts/customFetch";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import female from "../assets/imgs/avatar/female.png";
import male from "../assets/imgs/avatar/male.png";
import * as applicationConstants from "../Componnemts/utils/ApplicationConstants";
import colors from "../Componnemts/utils/colors";

const themedStyles = (theme) => {
  return {
    content: {
      padding: 3,
      marginLeft: applicationConstants.DRAWER_WIDTH + 15,
      marginTop: 75,
    },
  };
};
const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignements, setAssignement] = useState([]);
  const [openPopUP, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [anchorElm, setAnchorElm] = useState(null);
  const theme = useTheme();

  const fetchData = async () => {
    try {
      const response = await customFetch(
        "/api/assignement/assignements",
        "GET",
        jwt
      );
      setAssignement(response);
    } catch (error) {
      console.error("Error get Assignment:", error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleMenuOpen = (event, id) => {
    setAnchorElm(event.currentTarget);
    setId(id);
  };

  const handleMenuClose = () => {
    setAnchorElm(null);
  };

  const handleDelete = async () => {
    try {
      const response = await customFetch(
        `/api/assignement/DeletAssignment/${id}`,
        "DELETE",
        jwt
      );

      fetchData();
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [assignements]);

  return (
    <Grid container spacing={1} style={{ ...themedStyles(theme).content }}>
      {assignements.map((row) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={row.id}>
          <Card sx={{ backgroundColor: colors["boxShadow"] }}>
            <CardHeader
              avatar={
                <Avatar
                  src={
                    row.user.imageUrl
                      ? row.user.imageUrl
                      : row.user.gender === "male"
                      ? male
                      : female
                  }
                />
              }
              action={
                <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
                  <MoreVertIcon />
                </IconButton>
              }
              title={row.name}
              subheader={
                <Chip
                  label={row.status}
                  color={
                    row.status === "needs to be submitted"
                      ? "warning"
                      : "success"
                  }
                  variant="outlined"
                />
              }
            />
            <CardMedia
              component="img"
              height="194"
              image="https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Background Image"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Branch: {row.branch}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                GitHub URL: {row.getHubUrl}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                component="label"
                onClick={() => {
                  setOpenPopup(true);
                  setId(row.id);
                }}
                fullWidth
                startIcon={<EditIcon />}
                variant="contained"
              >
                Edit{" "}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Popup
        openPopup={openPopUP}
        setOpenPopup={setOpenPopup}
        title={`Edit Assignment ${id}`}
      >
        <FormEdit assId={id} handleClosePopup={handleClosePopup} />
      </Popup>
      <Menu
        anchorEl={anchorElm}
        open={Boolean(anchorElm)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineIcon /> Delete
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default CodeReviewerDashboard;
