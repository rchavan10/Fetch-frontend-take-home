import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const emptyState = (set, get) => ({
  favorites: {},

  addFavorite: (id, data) =>
    set((state) => ({
      favorites: {
        ...state.favorites,
        [id]: data,
      },
    })),

  removeFavorite: (id) =>
    set((state) => {
      const newFavorites = { ...state.favorites };
      delete newFavorites[id];
      return {
        favorites: newFavorites,
      };
    }),
});

export const usePersistedFavoritesStore = create(
  persist(emptyState, {
    name: "fetch-favorites",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useFavoritesStore = (selector, compare) => {
  const store = usePersistedFavoritesStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(emptyState);
};
