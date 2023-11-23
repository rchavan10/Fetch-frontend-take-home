import { tokens } from "@/theme/colorTokens";
import {
  Close,
  LocationSearching,
  MyLocation,
  Place,
  PlaceOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
  Grid,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SortSelect } from "./SortSelect";
import { useFilterStore, usePersistedFilterStore } from "@/store/filtersStore";

const useStyles = (theme) => ({
  pinCodeBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: { xs: "90%", sm: "70%", md: "60%" },
    borderRadius: "50px",
    boxShadow: `${
      theme.palette.mode === "light"
        ? "inset " + theme.shadows[10] + ", " + theme.shadows[10]
        : "inset " + theme.shadows[10] + ", " + theme.shadows[12]
    }`,
  },

  ageText: {
    "& label.Mui-focused": {
      color: theme.palette.secondary.main,
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },

  applyButton: {
    borderRadius: 28,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    width: "100%",
    backgroundColor: `${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.main}`,
    },
  },

  resetButton: {
    borderRadius: 28,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    width: "100%",
    transition: ".2s",
    backgroundColor: `${theme.palette.neutral.main}`,
    "&:hover": {
      backgroundColor: `${theme.palette.neutral.main}`,
    },
  },
});

export const FilterModal = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);
  const styles = useStyles(theme);

  const [pinCode, setPinCode] = useState(
    usePersistedFilterStore((state) => state.zipCode)
  );

  const [isZipCodeValid, setIsZipCodeValid] = useState(false);

  const [age, setLocalAge] = useState(
    usePersistedFilterStore((state) => state.age)
  );

  const setPage = useFilterStore((state) => state.setPage);
  const setZipCode = useFilterStore((state) => state.setZipCode);
  const setAge = useFilterStore((state) => state.setAge);

  const resetFilters = useFilterStore((state) => state.resetFilters);

  const handleInputChange = (e) => {
    setPinCode(e.target.value);
  };

  useEffect(() => {
    if (pinCode.length !== 0) {
      const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
      const isValid = regex.test(pinCode);

      setIsZipCodeValid(isValid);
    } else {
      setIsZipCodeValid(true);
    }
  }, [pinCode]);

  const applyFilters = () => {
    setZipCode(pinCode);
    setAge(age);
    setPage(1);
    handleClickClose();
  };

  const resetFilterHandler = () => {
    resetFilters();
    setPinCode("");
    setLocalAge([0, 40]);
    handleClickClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          padding: 1,
          boxShadow: `inset  ${theme.shadows[20]},  ${theme.shadows[20]}`,
          borderRadius: "10px",
          //   border: "1px solid red",
        }}
        onClick={handleClickOpen}
      >
        <TuneOutlined sx={{ fontSize: "1.8rem" }} />
      </Box>
      <Dialog
        disablePortal
        open={open}
        onClose={handleClickClose}
        maxWidth="xs"
        fullWidth
        scroll="paper"
        sx={{
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

            justifyContent: "space-between",
            padding: 0.5,
          }}
        >
          <Typography
            sx={{
              padding: 1,
              fontSize: "1.2rem",
            }}
          >
            {" "}
            Filters
          </Typography>
          <IconButton onClick={handleClickClose}>
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
          <Stack spacing={3} direction="column">
            <Box>
              <Box sx={styles.pinCodeBox}>
                <TextField
                  fullWidth
                  value={pinCode}
                  autoComplete="off"
                  placeholder="Enter Zip Code"
                  variant="standard"
                  sx={{
                    padding: "10px",
                    "& .MuiInputBase-root": {
                      fontSize: "1rem",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <LocationSearching
                        sx={{
                          mr: "5px",
                          color: `${
                            theme.palette.mode === "dark"
                              ? theme.palette.neutral.light
                              : theme.palette.neutral.main
                          }`,
                        }}
                      />
                    ),
                  }}
                  onChange={handleInputChange}
                />
              </Box>
              <Typography
                sx={{
                  color: theme.palette.error.main,
                  pt: 1,
                  pl: 1,
                  display: isZipCodeValid ? "none" : "block",
                }}
                variant="body2"
              >
                Invalid Zip Code
              </Typography>
            </Box>

            <Box mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "normal" }}>
                Age
              </Typography>

              <Box px={1} mt={1} mb={1}>
                <Slider
                  value={age}
                  onChange={(e, newValue) => setLocalAge(newValue)}
                  valueLabelDisplay="auto"
                  max={40}
                  sx={{
                    color: theme.palette.secondary.main,
                  }}
                />
              </Box>

              <Grid container spacing={2} mb={3}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    flexDirection: "column",
                  }}
                >
                  <Stack>
                    <span>Min</span>
                    <TextField
                      aria-readonly
                      sx={styles.ageText}
                      size="small"
                      id="min-age"
                      variant="outlined"
                      value={age[0]}
                    />
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    flexDirection: "column",
                  }}
                >
                  <Stack>
                    <span>Max</span>
                    <TextField
                      aria-readonly
                      sx={styles.ageText}
                      size="small"
                      id="max-age"
                      variant="outlined"
                      value={age[1]}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: { sm: "none", xs: "flex" },

                height: { xs: "45px", sm: "auto" },
              }}
              mt={3}
            >
              <SortSelect />
            </Box>

            <Box px={1}>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    sx={styles.resetButton}
                    onClick={resetFilterHandler}
                  >
                    Reset
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    disabled={!isZipCodeValid}
                    variant="contained"
                    sx={styles.applyButton}
                    onClick={applyFilters}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
