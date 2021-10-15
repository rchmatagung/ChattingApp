import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import NamaPesan from "./NamaPesan";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Kontak from "./Kontak";
import Pesan from "./Pesan";
import MasukkanPesan from "./MasukkanPesan";
import Wa from "../Wa.png";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "calc(100% - 40px)",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "#d3d3d3",
    color: "#000000",
    boxShadow: "unset",
    borderBottom: "1px solid rgba(0,0,0,.12)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#d3d3d3",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    display: "flex",
    marginTop: "40px",
    flexWrap: "wrap",
    height: "100%",
    backgroundImage: `url(${Wa})`,
  },
  chatFooter: {
    flexBasis: "100%",
    height: "100px",
    background: "#25D366",
    backgroundImage: `url(${Wa})`,
    borderRadius: "15px",
  },
  chatContent: {
    width: "100%",
    height: "calc(100% - 100px)",
    paddingLeft: theme.spacing(4),
    // overflowY: "scroll",
    overflowX: "hidden"
  },
  messageForm: {
    overflow: "hidden",
    margin: "20px",
    padding: "0",
    borderRadius: "500px",
  },
}));

const Main = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Kontak />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <NamaPesan></NamaPesan>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className={classes.chatContent}>
          <Pesan />
        </div>

        <div className={classes.chatFooter}>
          <MasukkanPesan />
        </div>
      </main>
    </div>
  );
};

export default Main;
