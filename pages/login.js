import { LoginBanner } from "@/components/login/LoginBanner";
import { LoginForm } from "@/components/login/LoginForm";
import { Grid } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const login = () => {
  const router = useRouter();

  const onLoginSubmitHandler = async (user) => {
    try {
      const response = await axios.post(baseURL + "/auth/login", user, {
        withCredentials: true, // Ensures credentials (cookies) are sent with the request
      });

      Cookies.set("fetch-frontend-user", user.email, {
        // expiration time 1 hour
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),

        // //expiration time 30 seconds
        // expires: new Date(new Date().getTime() + 30 * 1000),
      });

      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container>
        <Grid
          key="login-image"
          item
          md={6}
          sx={{
            display: { md: "flex", xs: "none" },
          }}
        >
          <LoginBanner />
        </Grid>
        <Grid
          item
          key="login-form"
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            height: "calc(100vh - 64px)",
          }}
        >
          <LoginForm onLoginSubmitHandler={onLoginSubmitHandler} />
        </Grid>
      </Grid>
    </>
  );
};

export default login;
