import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const emptyState = (set) => ({
  searchKeyword: "",
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
});

export const usePersistedSearchStore = create(
  persist(emptyState, {
    name: "fetch-search",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useSearchStore = (selector, compare) => {
  const store = usePersistedSearchStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(emptyState);
};
