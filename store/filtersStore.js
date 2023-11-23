import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const emptyState = (set) => ({
  sortOrder: "breeds:asc",
  setSortOrder: (sortOrder) => set({ sortOrder }),

  zipCode: "",
  setZipCode: (zipCode) => set({ zipCode }),

  age: [0, 40],
  setAge: (age) => set({ age }),

  page: 1,
  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      zipCode: "",
      age: [0, 40],
      sortOrder: "breeds:asc",
      page: 1,
    }),
});

export const usePersistedFilterStore = create(
  persist(emptyState, {
    name: "fetch-filter",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useFilterStore = (selector, compare) => {
  const store = usePersistedFilterStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(emptyState);
};
