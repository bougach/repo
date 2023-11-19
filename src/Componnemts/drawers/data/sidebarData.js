import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import UpdateIcon from "@mui/icons-material/Update";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

export const menuItems = [
  {
    text: "Awaiting Review",
    icon: <HourglassTopIcon />,
    link: "/dashboard",
  },
  {
    text: "In Review",
    icon: <WorkHistoryIcon />,
    link: "/dashboard/inReview",
  },
  {
    text: "Needs Update",
    icon: <UpdateIcon />,
    link: "/dashboard/needsUpdate",
  },
];
