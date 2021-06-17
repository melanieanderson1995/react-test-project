import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#F0F0F0",
  },
  title: {
    flexGrow: 1,
    fontSize: 28,
    color: "#F0F0F0",
  },
}));

export default function MenuAppBar() {
  // classes is a useStyles
  const classes = useStyles();

  // anchorEl describes the hamburger menu anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  // open is a boolean that describes if the menu is open
  const open = Boolean(anchorEl);

  /**
   * handleMenu opens the menu on an event.
   * @param {*} event the onclick event.
   */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * handleClose closes the menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#2A628F" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Employee Directory
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Employees</MenuItem>
            <MenuItem onClick={handleClose}>Departments</MenuItem>
            <MenuItem onClick={handleClose}>Org Chat</MenuItem>
            <MenuItem onClick={handleClose}>Locations</MenuItem>
            <MenuItem onClick={handleClose}>Teams</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
