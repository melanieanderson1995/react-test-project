import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "grey",
  },
}));

const headersData = [
  {
    label: "Employees",
  },
  { label: "Departments" },
  { label: "Org Chart" },
  { label: "Locations" },
  { label: "Teams" },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={header}>
        <div
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "red",
          }}
        >
          <Typography variant="h6">Employee Directory</Typography>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button color="inherit" onClick={handleClick}>
            Open Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepmounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Employees</MenuItem>
            <MenuItem onClick={handleClose}>Departments</MenuItem>
            <MenuItem onClick={handleClose}>Org Chart</MenuItem>
            <MenuItem onClick={handleClose}>Locations</MenuItem>
            <MenuItem onClick={handleClose}>Teams</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
