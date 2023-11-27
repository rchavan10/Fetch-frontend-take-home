import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDogsIds = async (keyword, zipCode, age, page) => {
  // create params object
  // include keyword and zipcode only if there are not empty strings
  // include age and page number by default
  const params = {
    ...(keyword && { breeds: keyword }),
    ...(zipCode && { zipCodes: zipCode }),
    ageMin: age[0],
    ageMax: age[1],
    from: (page - 1) * 25,
    size: 25,
  };

  const response = await axios.get(baseURL + "/dogs/search", {
    params,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials (HTTP-only cookies)
  });

  return response.data;
};

export const fetchBreeds = async () => {
  const response = await axios.get(baseURL + "/dogs/breeds", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials (HTTP-only cookies)
  });

  return response.data;
}

export const fetchDogs = async (dogIds) => {
  const response = await axios.post(baseURL + "/dogs", dogIds, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials (HTTP-only cookies)
  });

  return response.data;
};

export const fetchLocations = async (zipCodes) => {
  const response = await axios.post(baseURL + "/locations", zipCodes, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials (HTTP-only cookies)
  });
  return response.data;
};

export const fetchFavorites = async (favoritesIds) => {
  const response = await axios.post(baseURL + "/dogs/match", favoritesIds, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials (HTTP-only cookies)
  });

  return response.data;
};
