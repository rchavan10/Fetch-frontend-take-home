import { useFavoritesStore } from "@/store/favoritesStore";
import { tokens } from "@/theme/colorTokens";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const useStyles = (colors) => ({
  card: {
    position: "relative",
    overflow: "hidden",

    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "inherit",
    },

    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      background: "none",

      "& .heartIcon": {
        opacity: 1,
      },

      "& .titleBox": {
        bottom: 0,
      },

      "& .cardTitle": {
        marginBottom: 0.5,
      },
    },
  },

  cardMedia: {
    aspectRatio: "4/3",
    width: "100%",
  },

  titleBox: {
    zIndex: 200,
    position: "absolute",
    bottom: -30,
    width: "100%",
    color: "#fefefe",
    marginTop: 2,
    transition: "all .25s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",

    opacity: 1,
  },

  cardTitle: {
    typography: { sm: "h5", xs: "h4", md: "h6" },
    marginBottom: 1,
  },

  heartIcon: {
    opacity: 0,
    transition: "all .25s",
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export const DogCard = ({
  img,
  name,
  age,
  breed,
  zip_code,
  id,
  location,
  handleOpenModal,
}) => {
  const theme = useTheme();
  const colors = tokens(theme);
  const styles = useStyles(colors);

  const cardRef = useRef(null);
  const titleBoxRef = useRef(null);

  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore(
    (state) => state.favorites && Object.keys(state.favorites).includes(id)
  );

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const finalLocation = location
    ? location.city + ", " + location.state
    : zip_code;

  return (
    <Card
      elevation={theme.palette.mode === "dark" ? 20 : 10}
      sx={{
        ...styles.card,
        background: isImageLoaded
          ? "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 200px)"
          : "none",
      }}
      ref={cardRef}
      onClick={() =>
        handleOpenModal({ img, name, age, breed, zip_code, id, location })
      }
    >
      <CardMedia
        sx={styles.cardMedia}
        src={img}
        image={img}
        component="img"
        onLoad={() => setIsImageLoaded(true)}
      />

      <IconButton
        className="heartIcon"
        sx={styles.heartIcon}
        aria-label="Add to favorites"
        onClick={(e) => {
          e.stopPropagation(); // Stop event propagation
          const item = { img, name, age, breed, zip_code, id, location };
          isFavorite ? removeFavorite(id, item) : addFavorite(id, item);
        }}
      >
        {isFavorite ? (
          <FavoriteOutlined sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderOutlined sx={{ color: "#fff" }} />
        )}
      </IconButton>

      <Box
        sx={{
          padding: 1.5,
          ...styles.titleBox,
        }}
        className="titleBox"
        ref={titleBoxRef}
      >
        <Typography className="cardTitle" sx={styles.cardTitle}>
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
          }}
        >
          <PlaceOutlined
            sx={{
              fontSize: 16,
              marginRight: 0.5,
            }}
          />
          {finalLocation}
        </Typography>
      </Box>
    </Card>
  );
};
