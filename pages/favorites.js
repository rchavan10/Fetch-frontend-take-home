import React, { use, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { DogList } from "@/components/common/DogList";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchDogs, fetchFavorites, fetchLocations } from "@/utils/fetchData";

import axios from "axios";
import { SkeletonList } from "@/components/common/SkeletonList";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const favorites = () => {
  const favoritesObject = useFavoritesStore((state) => state.favorites);

  // Convert favorites object values to an array
  const favoritesArray = favoritesObject && Object.values(favoritesObject);

  const favoriteDogIds = favoritesObject && Object.keys(favoritesObject);

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleAuthError = async () => {
    try {
      const response = await axios.post(baseURL + "/auth/logout", null, {
        withCredentials: true, // Ensures credentials (cookies) are sent with the request
      });

      Cookies.remove("fetch-frontend-user");
      queryClient.removeQueries("favoriteDogMatch");
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Step 1: Get array of favorite dog ids and make an API call to get a matching id
  const {
    data: favoriteDogMatch,
    isLoading: matchLoading,
    isError: matchError,
    isFetching: matchFetching,
  } = useQuery(
    ["favoriteDogMatch", favoriteDogIds],
    () => fetchFavorites(favoriteDogIds),
    {
      enabled: favoriteDogIds !== undefined,
      cacheTime: 0,
      onError: (error) => {
        if (error?.response?.status === 401) {
          handleAuthError();
        } else if (error?.response?.status === 400) {
          queryClient.removeQueries("favoriteDogMatch");
        }
      },
    }
  );

  // Step 2: Utilize the matching id to get the dog object
  const {
    data: favoriteDog,
    isLoading: dogLoading,
    isError: dogError,
    isFetching: dogFetching,
  } = useQuery(
    ["favoriteDog", [favoriteDogMatch?.match]],
    () => fetchDogs([favoriteDogMatch?.match]),
    {
      enabled: !!favoriteDogMatch?.match,
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

  // Step 3: Utilize the dog object to get the location object
  const {
    data: location,
    isLoading: locationLoading,
    isError: locationError,
    isFetching: locationFetching,
  } = useQuery(
    ["locations", [favoriteDog?.[0]?.zip_code]],
    () => fetchLocations([favoriteDog?.[0]?.zip_code]),
    {
      enabled: !!favoriteDog?.[0]?.zip_code,
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

  useEffect(() => {
    return () => {
      if (matchLoading || matchFetching) {
        queryClient.cancelQueries(["favoriteDogMatch", favoriteDogIds]);
      }
    };
  }, [matchLoading, matchFetching]);

  useEffect(() => {
    return () => {
      if (dogLoading || dogFetching) {
        queryClient.cancelQueries(["favoriteDog", [favoriteDogMatch?.match]]);
      }
    };
  }, [dogLoading, dogFetching]);

  useEffect(() => {
    return () => {
      if (locationLoading || locationFetching) {
        queryClient.cancelQueries(["locations", [favoriteDog?.[0]?.zip_code]]);
      }
    };
  }, [locationLoading, locationFetching]);

  const favoriteDogWithLocation = {
    ...favoriteDog?.[0],
    location: location?.[0],
  };

  return (
    <Container maxWidth="xl">
      {favoritesArray && favoritesArray.length > 0 ? (
        <>
          <Box
            sx={{
              paddingY: 3,
            }}
          >
            <Typography variant="h2" mb={3}>
              Your Favorites
            </Typography>

            <DogList dogs={favoritesArray} />
          </Box>
          {!matchLoading &&
          !dogLoading &&
          !locationLoading &&
          !locationFetching ? (
            <Box
              sx={{
                paddingY: 3,
              }}
            >
              <Typography variant="h2" mb={3}>
                Matching Dog
              </Typography>
              <DogList dogs={[favoriteDogWithLocation]} />
            </Box>
          ) : (
            <Box
              sx={{
                paddingY: 3,
              }}
            >
              <Typography variant="h2" mb={3}>
                Matching Dog
              </Typography>
              <SkeletonList size={1} />
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            paddingY: 3,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
            }}
          >
            No Favorites...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default favorites;
