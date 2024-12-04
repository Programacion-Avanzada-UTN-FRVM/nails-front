import { useState } from "react";

export function usePaginacion() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return {
    handlePageChange,
    page,
    setTotalPages,
    totalPages,
  };
}
