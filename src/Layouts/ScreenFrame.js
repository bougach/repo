import React from "react";
import { useTheme, Paper, Typography, Box } from "@mui/material";
import * as applicationConstants from "../Componnemts/utils/ApplicationConstants";
import { positions } from "@mui/system";

const themedStyles = (theme) => {
  return {
    content: {
      padding: 3,
      marginLeft: applicationConstants.DRAWER_WIDTH + 15,
      marginTop: 75,
    },
    frame: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
    },
    screenTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  };
};

const ScreenFrame = ({ screenName, children }) => {
  const theme = useTheme();
  const styles = themedStyles(theme);

  return (
    <Paper sx={{ position: "absolute" }} elevation={3} className={styles.frame}>
      <Paper elevation={3} sx={{ position: "relative", mt: "0px" }}>
        {screenName}
      </Paper>

      <div style={{ ...styles.content }}>{children}</div>
    </Paper>
  );
};

export default ScreenFrame;
