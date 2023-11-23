import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import {
  usePersistedSearchStore,
  useSearchStore,
} from "@/store/searchKeywordStore";
import { Breeds } from "@/data/Breeds";
import { useFilterStore } from "@/store/filtersStore";

const useStyles = (theme) => ({
  searchBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: { xs: "90%", sm: "70%", md: "60%" },
    borderRadius: "50px",
    boxShadow: `inset  ${theme.shadows[20]},  ${theme.shadows[20]}`,
  },
});

export const SearchBar = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);
  const [keyword, setKeyword] = useState(
    usePersistedSearchStore.getState().searchKeyword
  );

  const setPage = useFilterStore((state) => state.setPage);

  const onSearchHandler = (e) => {
    e.preventDefault();
    setSearchKeyword(keyword);
    setPage(1);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSearchHandler}
      sx={styles.searchBox}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Breeds}
        value={keyword !== "" ? keyword : null}
        onChange={(e, newValue) => setKeyword(newValue ?? "")}
        sx={{
          width: "100%",
        }}
        slotProps={{
          paper: {
            sx: {
              background: `${theme.palette.background.default}`,
              boxShadow: `${
                theme.palette.mode === "dark"
                  ? theme.shadows[13]
                  : theme.shadows[10]
              }`,
              "*::-webkit-scrollbar ": {
                width: "0.5em",
              },
              "*::-webkit-scrollbar-track": {
                background:
                  theme.palette.mode === "dark"
                    ? theme.palette.neutral.main
                    : theme.palette.neutral.dark,
              },
              "*::-webkit-scrollbar-thumb": {
                background:
                  theme.palette.mode === "dark"
                    ? theme.palette.neutral.light
                    : theme.palette.neutral.main,
              },
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search by breed name"
            fullWidth
            value={keyword}
            sx={{
              padding: "5px 10px",
              "& .MuiInputBase-root": {
                fontSize: "1.1rem",
              },
            }}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: (
                <IconButton
                  sx={{
                    mr: "5px",
                  }}
                  type="submit"
                >
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
        )}
      />

      {/* <TextField
        placeholder="Search by breed name"
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        autoComplete="off"
        sx={{
          padding: "5px 10px",
          // background: "linear-gradient(45deg, #010d25, #02253c)",
        }}
        variant="standard"
        InputProps={{
          autoComplete: "off",
          disableUnderline: true,
          form: {
            autoComplete: "off",
          },
          style: {
            fontSize: "1.1rem",
          },
          startAdornment: (
            <IconButton
              sx={{
                mr: "5px",
              }}
              type="submit"
            >
              <SearchOutlined />
            </IconButton>
          ),
        }}
      /> */}
    </Box>
  );
};
