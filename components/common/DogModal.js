import { useFavoritesStore } from "@/store/favoritesStore";
import { tokens } from "@/theme/colorTokens";
import { Close, Google } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  Stack,
  CardMedia,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

export const DogModal = ({ dog, isOpen, handleCloseModal }) => {
  const theme = useTheme();

  const { id, img, name, age, breed, zip_code } = dog;
  const colors = tokens(theme.palette.mode);

  const location = dog.location
    ? {
        latitude: dog.location.latitude,
        longitude: dog.location.longitude,
      }
    : null;

  const finalLocation = dog.location
    ? dog.location.city + ", " + dog.location.state
    : "";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApiKey,
  });

  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore(
    (state) => state.favorites && Object.keys(state.favorites).includes(id)
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      disablePortal
      maxWidth="md"
      fullWidth
      scroll="paper"
      sx={{
        zIndex: 20000,
        "& .MuiDialog-paper": {
          backgroundColor: `${colors.primary[400]}`,
          backgroundImage: "none",
          boxShadow: `${theme.shadows[10]}`,
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",

          justifyContent: "flex-end",
          padding: 0.5,
        }}
      >
        <IconButton onClick={handleCloseModal}>
          <Close
            sx={{
              color: `${
                theme.palette.mode === "dark"
                  ? theme.palette.neutral.light
                  : theme.palette.neutral.main
              }`,
            }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          px: 2,
          mb: 1,
          //   border: "1px solid green",
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              sx={{
                aspectRatio: "13.5/9",

                width: "100%",
                borderRadius: "10px",
              }}
              image={dog?.img ?? ""}
              title={dog?.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} direction="column">
              <Typography
                sx={{
                  typography: { md: "h3", xs: "h4" },
                }}
              >
                Name: {dog?.name}
              </Typography>
              <Typography
                sx={{
                  typography: { md: "h3", xs: "h4" },
                }}
              >
                Breed: {dog?.breed}
              </Typography>
              <Typography
                sx={{
                  typography: { md: "h3", xs: "h4" },
                }}
              >
                Age: {dog?.age}
              </Typography>
              <Typography
                sx={{
                  typography: { md: "h3", xs: "h4" },
                }}
              >
                Zip Code: {dog?.zip_code}
              </Typography>
              {finalLocation !== "" && (
                <Typography
                  sx={{
                    typography: { md: "h3", xs: "h4" },
                  }}
                >
                  Location: {finalLocation}
                </Typography>
              )}
              <Button
              disabled={isFavorite}
              variant="contained"
              sx={{
                borderRadius: 28,
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: 18,
                width: "100%",
                backgroundColor: `${theme.palette.secondary.main}`,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: `${theme.palette.secondary.main}`,
              },
              }}
              onClick={(e) =>{
                e.stopPropagation();
                const dogLocation = dog.location ?? null;
                const item = { id, img, name, age, breed, zip_code, id, location: dogLocation };
                isFavorite ? removeFavorite(id, item) : addFavorite(id, item);
              }}
              >
                    Add to Favorites
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Box
          sx={{
            height: 300,
            width: "100%",

            marginTop: 2,
          }}
        >
          {location && isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                height: "100%",
                width: "100%",
                borderRadius: "10px",
              }}
              center={{
                lat: location.latitude,
                lng: location.longitude,
              }}
              zoom={15}
            >
              <Marker
                position={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
              />
            </GoogleMap>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
