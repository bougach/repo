import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useLocalState } from "./localStorage/useLocalstorage";
import customFetch from "./customFetch";
import { useNavigate } from "react-router-dom";
import Navbar from "./navBar/Navbar";

const FormEdit = (props) => {
  const { assId, handleClosePopup } = props;
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const [editedAssignment, setEditedAssignment] = useState({});
  const [selectedAssignmentname, setselectedAssignmentname] = useState("");

  const [assignmentEnum, setassignmentEnum] = useState([]);
  const [assignmentStatues, setassignmentStatues] = useState([]);

  const [id, setId] = useState(assId);

  const [statusChanged, setStatusChanged] = useState(false); // Track status change

  const fetchData = async () => {
    try {
      const response = await customFetch(`/api/assignement/${id}`, "GET", jwt);
      setEditedAssignment(response.assignement);
      setassignmentEnum(response.assignmentEnum);
      setassignmentStatues(response.statusEnum);
    } catch (error) {
      console.error("Error get Assignment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFieldChange = (field, value) => {
    setEditedAssignment((prevAssignment) => ({
      ...prevAssignment,
      [field]: value,
    }));
  };

  const save = async () => {
    try {
      const modifiedAssignment = {
        branch: editedAssignment.branch,
        getHubUrl: editedAssignment.getHubUrl,
        codeReviewVidioUrl: editedAssignment.codeReviewVidioUrl,
        status: editedAssignment.status,
        name: selectedAssignmentname,
      };

      if (statusChanged && editedAssignment.status === assignmentStatues[0].status) {
        modifiedAssignment.status = assignmentStatues[1].status;
      }

      const response = await customFetch(
        `/api/assignement/${id}`,
        "PUT",
        jwt,
        modifiedAssignment
      );

      console.log(response);
      console.log(selectedAssignmentname);
      handleClosePopup();
    } catch (error) {
      console.error("Error updating Assignment:", error);
    }
  };

  const textFieldStyles = {
    "& .MuiInputBase-root": {
      borderBottom: "2px solid #2196F3",
    },
  };

  useEffect(() => {
    if (editedAssignment.status !== statusRef.current) {
      setStatusChanged(true);
      statusRef.current = editedAssignment.status;
      console.log("Status changed:", editedAssignment.status); // Add this line
    }
  }, [editedAssignment.status]);
  

  const statusRef = useRef(editedAssignment.status);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Edit Assignment
            </Typography>

            {assId && (
              <Chip
                label={editedAssignment.status}
                color={
                  editedAssignment.status === "needs to be submitted"
                    ? "error"
                    : "success"
                }
                variant="outlined"
              />
            )}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Assignment Number
              </InputLabel>

              <Select
                label="Assignment Number"
                value={selectedAssignmentname}
                onChange={(e) => {
                  setselectedAssignmentname(e.target.value);
                }}
              >
                {assignmentEnum.map((assignmentemum) => (
                  <MenuItem
                    key={assignmentemum.assignmentNumber}
                    value={assignmentemum.assignmentName}
                  >
                    {assignmentemum.assignmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Branch"
              value={editedAssignment.branch || ""}
              onChange={(e) => handleFieldChange("branch", e.target.value)}
              fullWidth
              sx={textFieldStyles}
            />
            <TextField
              label="GitHub URL"
              value={editedAssignment.getHubUrl || ""}
              onChange={(e) => handleFieldChange("getHubUrl", e.target.value)}
              fullWidth
              sx={textFieldStyles}
            />
            <TextField
              label="Code Review Video URL"
              value={editedAssignment.codeReviewVidioUrl || ""}
              onChange={(e) =>
                handleFieldChange("codeReviewVidioUrl", e.target.value)
              }
              fullWidth
              sx={textFieldStyles}
            />
            <Button variant="contained" color="primary" onClick={save}>
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormEdit;
