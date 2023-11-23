import { useFilterStore } from "@/store/filtersStore";
import { Pagination, useTheme } from "@mui/material";

const useStyles = (theme) => ({
  paginator: {
    justifyContent: "center",

    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        background: theme.palette.secondary.main,
        color: "#fff",
        "&:hover": {
          background: theme.palette.secondary.main,
          opacity: ".8",
        },
      },

      "@media (max-width:390px)": {
        minWidth: "35px",
        height: "35px",
      },

      "@media (max-width:415px)": {
        margin: "0",
      },
    },
  },
});

export const PaginationTab = ({ totalPageCount = 100 }) => {
  const page = useFilterStore((state) => state.page);
  const setPage = useFilterStore((state) => state.setPage);
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    page && (
      <Pagination
        count={totalPageCount}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={styles.paginator}
        size="large"
        siblingCount={0}
        showFirstButton
        showLastButton
      />
    )
  );
};
