interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): JSX.Element {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          <button className="page-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
          </button>
        </li>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => {
                  onPageChange(number);
                }}
              >
                {number}
              </button>
            </li>
          );
        })}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          <button className="page-link" aria-label="Next">
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
