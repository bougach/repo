import { Outlet } from "react-router-dom";
import Navbar from "../Componnemts/navBar/GlobalNavBar";

const CodeRevieweRoutes = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  export default CodeRevieweRoutes;