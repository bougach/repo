import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocalState } from "../Componnemts/localStorage/useLocalstorage";
import customFetch from "../Componnemts/customFetch";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (jwt) {
  //       const apiUrl = `/api/auth/validate?token=${jwt}`;
  //       try {
  //         const rs = await customFetch(apiUrl, "GET",jwt,null);
  //         setIsValid(rs);
  //       } catch (error) {
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     } else {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [jwt]);

  // if (!jwt) {
  //   return <Navigate to="/login" />;
  // }

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  // if (isValid === true) {
  //   return children;
  // } else {
  //   return <Navigate to="/login" />;
  // }
  return jwt? children:<Navigate to="/"/>;
};

export default PrivateRoute;
