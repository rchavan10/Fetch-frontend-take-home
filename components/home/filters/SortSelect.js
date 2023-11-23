import { useFilterStore, usePersistedFilterStore } from "@/store/filtersStore";
import { tokens } from "@/theme/colorTokens";
import {
  useTheme,
  Box,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const useStyles = (theme, colors) => ({
  sortSelect: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    // width: { xs: "90%", sm: "70%", md: "60%" },
    borderRadius: "50px",
    boxShadow: `inset  ${theme.shadows[20]},  ${theme.shadows[20]}`,
    px: { md: 2, xs: 1 },
    marginLeft: { md: 2, xs: 0 },
    // marginRight: { md: 2, xs: 2 },
  },
});

export const SortSelect = () => {
  const theme = useTheme();
  const colors = tokens(theme);
  const [sortOrder, setLocalSortOrder] = useState(
    usePersistedFilterStore((state) => state.sortOrder)
  );
  const setSortOrder = useFilterStore((state) => state.setSortOrder);
  const styles = useStyles(theme, colors);

  const handleSelectChange = (e) => {
    setLocalSortOrder(e.target.value);
    setSortOrder(e.target.value);
  };

  return (
    <Box sx={styles.sortSelect}>
      <Typography noWrap variant="inherit" style={{ fontWeight: "normal" }}>
        Sort by
      </Typography>
      <Divider sx={{ height: "25px", mx: 1 }} orientation="vertical" />
      <FormControl
        variant="standard"
        sx={{
          pl: { md: 1, xs: 0.5 },
        }}
      >
        <Select
          value={sortOrder}
          defaultValue="breeds:asc"
          onChange={handleSelectChange}
          disableUnderline
          sx={{
            "& .MuiSelect-select": {
              background: "none",
            },
            "& :focus": {
              backgroundColor: "none",
            },
            textOverflow: "ellipsis",
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  boxShadow: `${
                    theme.palette.mode === "dark"
                      ? theme.shadows[13]
                      : theme.shadows[10]
                  }`,
                  backgroundImage: "none",
                  "& .Mui-selected": {
                    background: `${theme.palette.secondary.main} !important`,
                    backgroundColor: `${theme.palette.secondary.main} !important`,
                    color: `${theme.palette.primary.main}`,
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="breeds:asc">Breed (A-Z)</MenuItem>
          <MenuItem value="breeds:desc">Breed (Z-A)</MenuItem>
          <MenuItem value="minAge:asc">min Age (Youngest)</MenuItem>
          <MenuItem value="minAge:desc">min Age (Oldest)</MenuItem>
          <MenuItem value="maxAge:asc">max Age (Youngest)</MenuItem>
          <MenuItem value="maxAge:desc">max Age (Oldest)</MenuItem>
          <MenuItem value="zipCode:asc">Zip Code (Asc)</MenuItem>
          <MenuItem value="zipCode:desc">Zip Code (Desc)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
