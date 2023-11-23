import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { usePersistedSearchStore } from "./searchKeywordStore";
import { usePersistedFilterStore } from "./filtersStore";
import { usePersistedFavoritesStore } from "./favoritesStore";

const emptyState = (set, get) => ({
  colorMode: "light",
  toggleColorMode: () =>
    set((state) => ({
      colorMode: state.colorMode === "dark" ? "light" : "dark",
    })),
});

const usePersistedColorStore = create(
  persist(emptyState, {
    name: "fetch-color-mode",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useColorStore = (selector, compare) => {
  const store = usePersistedColorStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(emptyState);
};

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("FetchColorStore", usePersistedColorStore);
  mountStoreDevtool("FetchSearchKeywordStore", usePersistedSearchStore);
  mountStoreDevtool("FetchFilterStore", usePersistedFilterStore);
  mountStoreDevtool("FetchFavoritesStore", usePersistedFavoritesStore);
}
