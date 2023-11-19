import React, { useEffect, useState } from "react";
import { useLocalState } from "../../Componnemts/localStorage/useLocalstorage";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import customFetch from "../../Componnemts/customFetch";

const AssignmentDetails = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignement, setAssignement] = useState({});
  const [assignementEnum, setAssignementEnum] = useState([]);

  const assignementId = window.location.href.split("/assignments/")[1];
  const fetchData = async () => {
    try {
      const response = await customFetch(`/api/assignement/${assignementId}`, "GET", jwt);
      console.log(response)

      if (response && response.assignement) {
        setAssignement(response.assignement);
        setAssignementEnum(response.assignmentEnums);
      } else {
        console.error("Assignment data not found in the response");
      }
    } catch (error) {
      console.error("Error get Assignment:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      {assignement.id ? (
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ border: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://cdn.pixabay.com/photo/2021/09/23/06/59/github-6648895_1280.jpg"
              alt="GitHub Logo"
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom textAlign={"center"}>
                Assignment {assignement.id} :
              </Typography>
              <Typography variant="body1">
                Status: {assignement.status}
                <br />
                Branch: {assignement.branch}
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Grid>
  );
};

export default AssignmentDetails;
