import { Box, Container } from "@mui/material";
import Image from "next/image";

export const LoginBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "calc(100vh - 64px)",
        position: "relative",
      }}
    >
      <Image
        style={{
          objectFit: "cover",
        }}
        src="/images/login-dog.jpg"
        fill
        alt="dog"
        sizes="100vw"
      />
    </Box>
  );
};
