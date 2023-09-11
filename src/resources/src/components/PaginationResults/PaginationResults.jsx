import { useForm } from "../../hooks";
import "./styles.scss";

export const PaginationResults = () => {
  const {
    getResults,
    setPerPageResults,
    perPageResults,
    pageResults: currentPage,
    setPageResults,
    totalPagesResults,
  } = useForm();

  const cLeft = `${window.baseAssetsUrl || ""}/img/chevron-left.svg`;
  const cRight = `${window.baseAssetsUrl || ""}/img/chevron-right.svg`;

  const handleItemsPerPageChange = async (e) => {
    const value = parseInt(e.target.value, 10);
    setPerPageResults(value);
    getResults(value, 1);
  };
  const handlePageChange = (page) => {
    getResults(perPageResults, page);
  };

  return (
    <div className="row  box-sizing">
      <div className="col-12 col-md-6">
        <span>Ver</span>
        <div className="d-inline-block mx-1">
          <select
            className="form-control"
            onChange={handleItemsPerPageChange}
            value={perPageResults}
          >
            {[2, 10, 25, 50, 100].map((i, index) => (
              <option value={i} key={index}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <span>filas</span>
      </div>
      <div className="col-12 col-md-6">
        <ul className="p-0 m-0">
          <li
            className={`page-item m-1 ${currentPage === 1 ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={
                currentPage !== 1
                  ? () => handlePageChange(currentPage - 1)
                  : null
              }
            >
              <img width={18} height={18} className="img-fluid" src={cLeft} />
            </button>
          </li>
          {Array.from({ length: totalPagesResults }, (_, index) => (
            <li
              key={index}
              className={`m-1 page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={
                  currentPage !== index + 1
                    ? () => handlePageChange(index + 1)
                    : null
                }
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item m-1 ${
              currentPage === totalPagesResults ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={
                currentPage !== totalPagesResults
                  ? () => handlePageChange(currentPage + 1)
                  : null
              }
            >
              <img width={18} height={18} className="img-fluid" src={cRight} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
