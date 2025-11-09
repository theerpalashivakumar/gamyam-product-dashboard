import { useEffect, useState } from "react";

const useDebouceSearch = (initialvalue, delay = 100) => {
  const [search, setSearch] = useState(initialvalue);

  useEffect(() => {
    const searchHandler = setTimeout(() => {
      setSearch(initialvalue);
    }, delay);
    return () => {
      clearTimeout(searchHandler);
    };
  }, [initialvalue, delay]);
  return search
};
export default useDebouceSearch