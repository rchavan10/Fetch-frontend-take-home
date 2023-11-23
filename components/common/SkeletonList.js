import { Grid } from "@mui/material";
import { SkeletonCard } from "./SkeletonCard";

export const SkeletonList = ({ size = 12 }) => {
  return (
    <Grid container spacing={3}>
      {[...Array(size)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
};
