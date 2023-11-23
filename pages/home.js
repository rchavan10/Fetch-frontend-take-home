import { DogList } from "@/components/common/DogList";
import { SearchBar } from "@/components/home/SearchBar";
import { FilterModal } from "@/components/home/filters/FilterModal";

import { Sort } from "@mui/icons-material";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Dogs } from "@/data/Dogs";
import { PaginationTab } from "@/components/home/PaginationTab";
import { SkeletonList } from "@/components/common/SkeletonList";
import axios from "axios";
import { useSearchStore } from "@/store/searchKeywordStore";
import { useFilterStore } from "@/store/filtersStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDogsIds, fetchDogs, fetchLocations } from "@/utils/fetchData";
import { useRouter } from "next/router";

const SortSelect = dynamic(
  () =>
    import("@/components/home/filters/SortSelect").then(
      (mod) => mod.SortSelect
    ),
  {
    ssr: false,
  }
);

const home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const router = useRouter();
  const keyword = useSearchStore((state) => state.searchKeyword);
  const zipCode = useFilterStore((state) => state.zipCode);
  const page = useFilterStore((state) => state.page);
  const age = useFilterStore((state) => state.age);

  const queryClient = useQueryClient();

  const handleAuthError = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
        null,
        {
          withCredentials: true, // Ensures credentials (cookies) are sent with the request
        }
      );

      Cookies.remove("fetch-frontend-user");
      queryClient.removeQueries("dogIds");
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["dogIds", keyword, zipCode, age, page],
    () => fetchDogsIds(keyword, zipCode, age, page),
    {
      enabled:
        keyword !== undefined &&
        zipCode !== undefined &&
        age !== undefined &&
        page !== undefined,

      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      onError: (error) => {
        if (error?.response?.status === 401) {
          handleAuthError();
        }
      },
    }
  );

  const {
    data: dogs,
    isLoading: detailsLoading,
    isError: detailsError,
    isFetching: detailsFetching,
  } = useQuery(
    ["dogDetails", data?.resultIds],
    () => fetchDogs(data?.resultIds),
    {
      enabled: !!data?.resultIds,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      keepPreviousData: true, // Only enable the query if dogIds is truthy
      onError: (error) => {
        if (error?.response?.status === 401) {
          handleAuthError();
        }
      },
    }
  );

  const {
    data: locations,
    isLoading: locationsLoading,
    isError: locationsError,
    isFetching: locationsFetching,
  } = useQuery(
    ["locations", dogs?.map((dog) => dog.zip_code)],
    () => fetchLocations(dogs?.map((dog) => dog.zip_code)),
    {
      enabled: !!dogs,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onError: (error) => {
        if (error?.response?.status === 401) {
          handleAuthError();
        }
      },
    }
  );

  // Function to update each dog with its corresponding location
  const updateDogsWithLocations = (dogs, locations) => {
    return dogs?.map((dog) => {
      const location = locations?.find((loc) => {
        if (loc === null) {
          return null;
        }
        return loc.zip_code === dog.zip_code;
      });

      return {
        ...dog,
        location,
      };
    });
  };

  // Update dogs with locations once the locations query is successful
  const updatedDogs =
    locationsFetching && dogs !== undefined
      ? dogs
      : updateDogsWithLocations(dogs, locations);

  useEffect(() => {
    return () => {
      if (isLoading || isFetching) {
        queryClient.cancelQueries(["dogIds", keyword, zipCode, age, page]);
      }
    };
  }, [isLoading, isFetching]);

  useEffect(() => {
    return () => {
      if (detailsLoading || detailsFetching) {
        queryClient.cancelQueries(["dogDetails", data?.resultIds]);
      }
    };
  }, [detailsLoading, detailsFetching]);

  useEffect(() => {
    return () => {
      if (locationsLoading || locationsFetching) {
        queryClient.cancelQueries([
          "locations",
          dogs?.map((dog) => dog.zip_code),
        ]);
      }
    };
  }, [locationsLoading, locationsFetching]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 0.1,
        }}
      >
        <Grid
          item
          xs={12}
          // md={9}
          // lg={10}
          sx={{
            borderLeft: "linear 2px #CFCBCF",
            boxShadow: "inset 4px 0 12px -9px rgba(0,0,0,0.36)",
            paddingBottom: 5,
          }}
        >
          <Container
            maxWidth="xl"
            // sx={{
            //   border: "1px solid blue",
            // }}
          >
            <Grid container>
              <Grid
                item
                sx={{
                  alignItems: "flex-end",
                  pt: 1.5,
                  mr: { xs: 0, md: 2 },
                }}
              >
                <FilterModal />
              </Grid>

              <Grid
                item
                xs={10}
                sm={7.5}
                md={8.5}
                lg={8.3}
                sx={{ pt: 1.5, pl: { xs: 2, sm: 1, md: 0 } }}
              >
                <SearchBar />
              </Grid>

              {!isSmallScreen && (
                <Grid
                  item
                  // xs={3.5}
                  sm={3.5}
                  md={2.5}
                  lg={3}
                  sx={{ pt: 1.5 }}
                >
                  <SortSelect />
                </Grid>
              )}
            </Grid>

            <Box marginTop={5}>
              {updatedDogs !== undefined ? (
                <DogList dogs={updatedDogs} />
              ) : (
                <SkeletonList />
              )}
            </Box>
            <Box
              mt={6}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PaginationTab totalPageCount={data?.total} />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default home;
