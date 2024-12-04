import PropTypes from "prop-types";

export function Paginacion({ handlePageChange, totalPages }) {
  return (
    <div className="pagination d-md-flex justify-content-md-end">
      {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(pageNumber);
          }}
        >
          | {pageNumber} |
        </button>
      ))}
    </div>
  );
}

Paginacion.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
