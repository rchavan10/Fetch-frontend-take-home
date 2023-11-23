import {
  HomeOutlined,
  LogoutOutlined,
  FavoriteBorderOutlined,
  LoginOutlined,
} from "@mui/icons-material";

export const navigationLinks = [
  {
    to: "/home",
    title: "Home",
    icon: <HomeOutlined />,
  },
  {
    to: "/favorites",
    title: "Favorites",
    icon: <FavoriteBorderOutlined />,
  },
];

export const loginLink = {
  to: "/login",
  title: "Login",
  icon: <LoginOutlined />,
};

export const logoutLink = {
  to: "/logout",
  title: "Logout",
  icon: <LogoutOutlined />,
};
