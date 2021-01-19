import React, {useState, useEffect, useContext} from 'react'


//Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {AppBar, Toolbar, Hidden, Grid, Tabs, Tab, Button, Popper, Grow, ClickAwayListener, IconButton, Menu, MenuList,  MenuItem, SwipeableDrawer, Paper,
        List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, 
        Typography, useMediaQuery, useScrollTrigger} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import LanguageSwitchTab from './LanguageSwitcher'



// Link
import Link from '../Link'

// router (ex. to redirect...)
import Router from 'next/router'
import DataContext from '../../Context/DataContext';

//Multilanguage support
import { withTranslation } from '../../i18n'



function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

// Material-UI styles 
const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    fontFamily: "Pacifico",
    fontSize: "1rem",
    textTransform: "none",
    color: "white",
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
    zIndex: 1302
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemSpecial: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1
    }
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  },
  expansion: {
    backgroundColor: theme.palette.common.blue,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "&.Mui-expanded": {
      margin: 0,
      borderBottom: 0
    },
    "&::before": {
      backgroundColor: "rgba(0, 0, 0, 0)"
    }
  },
  expansionDetails: {
    padding: 0,
    backgroundColor: theme.palette.primary.light
  },
  expansionSummary: {
    padding: "0 24px 0 16px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    },
    backgroundColor: props =>
      props.value === 1 ? "rgba(0, 0, 0, 0.14)" : "inherit"
  }
}));

const Header = ({t, ...props}) => {
    const {value, setValue, selectedIndex, setSelectedIndex} = useContext(DataContext)
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);


    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    const [previousURL, setPreviousURL] = useState("");

    const handleChange = (e, newValue) => {
    setValue(newValue);
    };

    const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
    };

    const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
    };

    const handleClose = e => {
    setAnchorEl(null);
    setOpenMenu(false);
    };

    function handleListKeyDown(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        setOpen(false);
    }
    }

    const menuOptions = [
    {
        name: "MenuItem1",
        link: "#",
        activeIndex: 1,
        selectedIndex: 0
    },
    {
        name: "MenuItem2",
        link: "#",
        activeIndex: 1,
        selectedIndex: 1
    },
    {
        name: "MenuItem3",
        link: "#",
        activeIndex: 1,
        selectedIndex: 2
    }
    ];

    const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
        name: "Menus",
        link: "/menus",
        activeIndex: 1,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        mouseOver: event => handleClick(event)
    },    
    { name: "About Us", link: "/about", activeIndex: 2 },
    { name: "Contact Us", link: "#", activeIndex: 3 }
    ];

    function checkPath() {
    [...menuOptions, ...routes].forEach(route => {
        switch (window.location.pathname) {
        case `${route.link}`:
            if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (
                route.selectedIndex &&
                route.selectedIndex !== selectedIndex
            ) {
                setSelectedIndex(route.selectedIndex);
            }
            }
            break;
        case "/special":
            if (value !== false) {
            setValue(false);
            }

            break;
        default:
            break;
        }
    });
    }

    useEffect(() => {
    if (previousURL !== window.location.pathname) {
        setPreviousURL(window.location.pathname);
        //ReactGA.pageview(window.location.pathname + window.location.search);
    }

    if (window.performance) {
        if (performance.navigation.type == 1) {
        checkPath();
        }
    }
    }, [value, menuOptions, selectedIndex, routes, props]);

    Router.events.on("routeChangeComplete", url => {
      checkPath();
    });

    const tabs = (
    <>
        <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
        >
        {routes.map((route, index) => (
            <Tab
              key={`${route}${index}`}
              className={classes.tab}
              style={{textDecoration: 'none'}}
              component={Link}
              href={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
              onMouseLeave={() => setOpenMenu(false)}
            />
        ))}
        </Tabs>
        <LanguageSwitchTab />        
          <Button  
              component={Link}    
              href='/'          
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                  setValue(false);            
              }}
              >
              Special
          </Button>       
        <Popper
        open={openMenu}
        anchorEl={anchorEl}
        placement="bottom-start"
        role={undefined}
        transition
        disablePortal
        >
        {({ TransitionProps, placement }) => (
            <Grow
            {...TransitionProps}
            style={{
                transformOrigin: "top left"
            }}
            >
            <Paper classes={{ root: classes.menu }} elevation={0}>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                    onMouseOver={() => setOpenMenu(true)}
                    onMouseLeave={handleClose}
                    disablePadding
                    autoFocusItem={false}
                    id="simple-menu"
                    onKeyDown={handleListKeyDown}
                >
                    {menuOptions.map((option, i) => (                       
                        <MenuItem
                            href={option.link}
                            component={Link}
                            key={`${option}${i}`}                               
                            classes={{ root: classes.menuItem }}
                            onClick={event => {
                            handleMenuItemClick(event, i);
                            setValue(1);
                            handleClose();
                            }}
                            selected={
                            i === selectedIndex &&
                            value === 1 &&
                            window.location.pathname !== "/menus"
                            }
                        >
                            {option.name}
                        </MenuItem>                   
                    ))}
                </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper>
       
    </>
    );

    const drawer = (
    <>
        <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
            {routes.map((route, i) =>
            route.name === "Menus" ? (
                <Accordion
                elevation={0}
                key={i}
                classes={{ root: classes.expansion }}
                >
                <AccordionSummary
                    classes={{ root: classes.expansionSummary }}
                    expandIcon={<ExpandMoreIcon color="secondary" />}
                >
                    
                   
                    <ListItem className={classes.drawerItem} href={route.link} component={Link}>
                        <ListItemText 
                            disableTypography
                            style={{ opacity: value === 1 ? 1 : null }}
                            onClick={() => {
                                setOpenDrawer(false);
                                setValue(route.activeIndex);
                            }}>
                                {route.name}
                        </ListItemText>
                    </ListItem>
                        
            
                
                </AccordionSummary>
                <AccordionDetails
                    classes={{ root: classes.expansionDetails }}
                >
                    <Grid container direction="column">
                    {menuOptions.map((route, index) => (
                        <Grid item key={index} >
                           
                          <ListItem
                              divider
                              key={`${route}${route.seleselectedIndex}`}
                              button
                              href={route.link}
                              component={Link}                                    
                              selected={
                              selectedIndex === route.selectedIndex &&
                              value === 1 &&
                              window.location.pathname !== "/services"
                              }
                              classes={{ selected: classes.drawerItemSelected }}
                              onClick={() => {
                              setOpenDrawer(false);
                              setSelectedIndex(route.selectedIndex);
                              }}
                              >
                                  <ListItemText
                                      className={classes.drawerItem}
                                      disableTypography
                                      >
                                      {route.name}                                            
                                  </ListItemText>
                          </ListItem>
                           
                        
                        </Grid>
                    ))}
                    </Grid>
                </AccordionDetails>
                </Accordion>
            ) : (
                
              <ListItem
                divider
                key={`${route}${route.activeIndex}`}
                button
                href={route.link}
                component={Link}                  
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                    setOpenDrawer(false);
                    setValue(route.activeIndex);
                }}
                >
                <ListItemText className={classes.drawerItem} disableTypography>
                    {route.name}
                </ListItemText>
              </ListItem>
              
               
            )
            )}
            
              <ListItem
                onClick={() => {
                    setOpenDrawer(false);
                    setValue(false);
                    /*
                    ReactGA.event({
                    category: "Estimate",
                    action: "Mobile Header Pressed"
                    });
                      */
                  }}
                  divider
                  button
                  href='/estimate'
                  component={Link}
                  classes={{
                      root: classes.drawerItemSpecial,
                      selected: classes.drawerItemSelected
                  }}                 
                 
                  selected={value === 4}
                >
                    <ListItemText className={classes.drawerItem} disableTypography>
                        Special
                    </ListItemText>
                </ListItem>
           
            
        </List>
        </SwipeableDrawer>
        <IconButton
          className={classes.drawerIconContainer}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
          >
            <MenuIcon className={classes.drawerIcon} />
        </IconButton>
    </>
    );
    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appbar}>
                <Toolbar disableGutters>                   
                  <Button    
                    component={Link}
                    href='/'                      
                    disableRipple
                    onClick={() => props.setValue(0)}
                    className={classes.logoContainer}
                    style={{ textDecoration: "none" }}
                    >
                        LogoImg
                  </Button>     
                   
                    <Hidden mdDown>{tabs}</Hidden>
                    <Hidden lgUp>{drawer}</Hidden>
                </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    )
}

export default withTranslation()(Header)
