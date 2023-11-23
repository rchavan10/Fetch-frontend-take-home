import { Card, CardMedia, Skeleton, useTheme } from "@mui/material";

export const SkeletonCard = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background: "rgba(0,0,0,0.05)",
      }}
      elevation={theme.palette.mode === "dark" ? 20 : 10}
    >
      <CardMedia
        sx={{
          aspectRatio: "4/3",
          width: "100%",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </CardMedia>
    </Card>
  );
};
