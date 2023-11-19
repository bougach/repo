import React, { useEffect, useState } from "react";
import {
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./dashboard";
import Loging from "./Login";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Create from "./dashboard/AddnewAgent/AddNewAgent";
import Step0 from "./Componnemts/forgetPassword/screens/step0/step0";
import Step2 from "./Componnemts/forgetPassword/screens/step2/Step2";
import SignIn from "./Login/signin";
import AddnNoteComponent from "./Componnemts/formik/AddnNoteComponent";
import Hero from "./home/Hero";
import Navbar from "./Componnemts/navBar/GlobalNavBar";
import jwt_decode from "jwt-decode";

import { useLocalState } from "./Componnemts/localStorage/useLocalstorage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InReview from "./assignement/in-review/inReview";
import NeedsUpdate from "./assignement/needs-update/needsUpdate";
import { CssBaseline } from "@mui/material";
import { pink } from "@mui/material/colors";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error from "./Componnemts/pages/errorPage";
import RoutesHome from "./Layouts/Homeroute";
import CodeRevieweRoutes from "./Layouts/CodeRevieweRoutes";
import CodeReviewerDashboard from "./codereviewerDashbord";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: pink[100] },
    },
  });
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [jwt]);

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  const routHome = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RoutesHome />}>
        <Route index element={<Hero />} />
        <Route path="login" element={<Loging />} />
        <Route exact path="Forgot" element={<Step0 />} />
        <Route exact path="changepassword/:token" element={<Step2 />} />
        <Route exact path="Create" element={<Create />} />
        <Route exact path="SignIn" element={<SignIn />} />
        <Route exact path="Add" element={<AddnNoteComponent />} />
        <Route path="dashboard" element={<CodeRevieweRoutes />}>
          <Route
            index
            element={
              roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                <PrivateRoute>
      <CodeReviewerDashboard />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="inReview" 
            element={
              <PrivateRoute>
                <InReview />
              </PrivateRoute>
            }
          />
          <Route
            path="needsUpdate" // Updated to be relative to "/dashboard"
            element={
              <PrivateRoute>
                <NeedsUpdate />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<Error/>}/>
      </Route>
    )
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={routHome} />
      <CssBaseline />
    </ThemeProvider>
  );
}


export default App;
