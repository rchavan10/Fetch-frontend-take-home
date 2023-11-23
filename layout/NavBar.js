import React from "react";
import {
  useTheme,
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Button,
  Container,
  Icon,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  PetsOutlined,
} from "@mui/icons-material";
import NextLink from "next/link";

import { tokens } from "@/theme/colorTokens";
import { loginLink, logoutLink, navigationLinks } from "./NavigationLinks";
import { useState, useEffect } from "react";
import { useColorStore } from "@/store/colorStore";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const drawerWidth = 240;

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const toggleColorMode = useColorStore((state) => state.toggleColorMode);
  const router = useRouter();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const userInCookie = !!Cookies.get("fetch-frontend-user");

  const checkUserInCookie = () => {
    if (userInCookie) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  };

  // simulate logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(baseURL + "/auth/logout", null, {
        withCredentials: true, // Ensures credentials (cookies) are sent with the request
      });

      Cookies.remove("fetch-frontend-user");

      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserInCookie();
  }, [userInCookie]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",

        "& .MuiListItemButton-root.Mui-selected": {
          color: `#fcfcfc !important`,
          backgroundColor: `${colors.blueAccent[500]} !important`,
          borderRadius: "10px",
        },

        "& .MuiListItemButton-root:hover": {
          backgroundColor: `${
            theme.palette.mode === "dark"
              ? colors.primary[400]
              : colors.blueAccent[800]
          } !important`,
          borderRadius: "10px",
        },
      }}
    >
      <Typography variant="h3" sx={{ my: 2 }}>
        Doggo
      </Typography>
      <Divider />
      <List>
        {navigationLinks.map((item) => (
          <ListItem key={item.title}>
            <ListItemButton
              selected={router.pathname === item.to}
              component={NextLink}
              href={item.to}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  typography: "h5",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {isUserLoggedIn ? (
          <ListItem>
            <ListItemButton
              key={logoutLink.title}
              onClick={handleLogout}
              sx={{
                color: theme.palette.neutral.light,
                mr: 2,
                "&:hover": {
                  backgroundColor: `${
                    theme.palette.mode === "dark"
                      ? colors.primary[400]
                      : colors.blueAccent[800]
                  } !important`,
                },
                borderRadius: "10px",
                fontSize: ".9rem",
                textTransform: "none",
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
                {logoutLink.icon}
              </ListItemIcon>
              <ListItemText
                primary={logoutLink.title}
                primaryTypographyProps={{
                  typography: "h5",
                  fontWeight: 500,
                }}
              />
              {/* {logoutLink.title} */}
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem>
            <ListItemButton
              selected={router.pathname === loginLink.to}
              key={loginLink.title}
              onClick={handleLogout}
              sx={{
                color: theme.palette.neutral.light,
                mr: 2,
                "&:hover": {
                  backgroundColor: `${
                    theme.palette.mode === "dark"
                      ? colors.primary[400]
                      : colors.blueAccent[800]
                  } !important`,
                },
                borderRadius: "10px",
                fontSize: ".9rem",
                textTransform: "none",
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
                {loginLink.icon}
              </ListItemIcon>
              <ListItemText
                primary={loginLink.title}
                primaryTypographyProps={{
                  typography: "h5",
                  fontWeight: 500,
                }}
              />
              {/* {logoutLink.title} */}
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar
        component="nav"
        color="inherit"
        style={{
          background: `${theme.palette.background.paper}`,
          boxShadow: `${
            theme.palette.mode === "dark"
              ? theme.shadows[12]
              : theme.shadows[10]
          }`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              paddingLeft: "0 !important",
              paddingRight: "0 !important",
            }}
          >
            <Box display="flex" flexDirection="row" alignContent="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
              <Icon
                sx={{
                  // color: `${colors.blueAccent[500]}`,
                  marginRight: "0.5rem",
                  marginBottom: "0.2rem",
                  alignSelf: "center",
                }}
              >
                <PetsOutlined />
              </Icon>
              <Typography
                sx={{
                  typography: { sm: "h4", xs: "h5" },
                  alignSelf: "center",
                  fontWeight: "500 !important",
                }}
              >
                Doggo
              </Typography>
            </Box>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  "& .selected": {
                    color: `${colors.blueAccent[500]} !important`,
                  },
                }}
              >
                {isUserLoggedIn &&
                  navigationLinks.map((item) => (
                    <Button
                      key={item.title}
                      // color={theme.palette.neutral.light}
                      component={NextLink}
                      href={item.to}
                      className={router.pathname === item.to ? "selected" : ""}
                      sx={{
                        color: theme.palette.neutral.light,
                        mr: 2,
                        "&:hover": {
                          backgroundColor: `${
                            theme.palette.mode === "dark"
                              ? colors.primary[400]
                              : colors.blueAccent[800]
                          } !important`,
                        },
                        borderRadius: "10px",
                        fontSize: ".9rem",
                        textTransform: "none",
                      }}
                    >
                      {item.title}
                    </Button>
                  ))}

                {isUserLoggedIn ? (
                  <Button
                    key={logoutLink.title}
                    onClick={handleLogout}
                    sx={{
                      color: theme.palette.neutral.light,
                      mr: 2,
                      "&:hover": {
                        backgroundColor: `${
                          theme.palette.mode === "dark"
                            ? colors.primary[400]
                            : colors.blueAccent[800]
                        } !important`,
                      },
                      borderRadius: "10px",
                      fontSize: ".9rem",
                      textTransform: "none",
                    }}
                  >
                    {logoutLink.title}
                  </Button>
                ) : (
                  <Button
                    key={loginLink.title}
                    // color={theme.palette.neutral.light}
                    component={NextLink}
                    href={loginLink.to}
                    className={
                      router.pathname === loginLink.to ? "selected" : ""
                    }
                    sx={{
                      color: theme.palette.neutral.light,
                      mr: 2,
                      "&:hover": {
                        backgroundColor: `${
                          theme.palette.mode === "dark"
                            ? colors.primary[400]
                            : colors.blueAccent[800]
                        } !important`,
                      },
                      borderRadius: "10px",
                      fontSize: ".9rem",
                      textTransform: "none",
                    }}
                  >
                    {loginLink.title}
                  </Button>
                )}
              </Box>
              <IconButton onClick={toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <LightModeOutlined />
                ) : (
                  <DarkModeOutlined />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: "none !important",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};
