import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonIcon from "@mui/icons-material/Person";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router";
import { Settings } from "@mui/icons-material";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
  { text: "Smart Accounts", icon: <PersonIcon />, path: "/smart-accounts" },
  {
    text: "Subscriptions",
    icon: <SubscriptionsIcon />,
    path: "/subscriptions",
  },
  {
    text: "Activity Logs",
    icon: <HistoryIcon />,
    path: "/activity-logs",
  },
  {
    text: "Contract Management",
    icon: <Settings />,
    path: "/contract-management",
  },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={selectedIndex === index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                onClick={() => {
                  setSelectedIndex(index);
                  navigate(item.path);
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
