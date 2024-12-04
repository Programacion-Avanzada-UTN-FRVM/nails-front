import { useMemo, useState } from "react";
import PropTypes from "prop-types";

export function useSort(items) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  function handleSort(key) {
    const direction =
      key === sortConfig.key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    setSortConfig({ key, direction });
  }

  const itemsOrdenados = useMemo(() => {
    const sortableItems = [...items];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [items, sortConfig]);

  return {
    handleSort,
    itemsOrdenados,
    sortConfig,
  };
}

useSort.propTypes = {
  items: PropTypes.array.isRequired,
};
