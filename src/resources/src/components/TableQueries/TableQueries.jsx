import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./styles.scss";
import { GenereteFormatDate, months } from "../../partials";
import { useQueries, useDeleteQuery } from "../../hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TableQueries = () => {
  const cLeft = `${window.baseAssetsUrl || ""}/img/chevron-left.svg`;
  const cRight = `${window.baseAssetsUrl || ""}/img/chevron-right.svg`;

  const {
    GetDataQueries,
    currentPage,
    setCurrentPage,
    dataQueries,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    loading,
  } = useQueries();

  const { DeleteItem } = useDeleteQuery();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const perPage = [10, 25, 50, 100];

  useEffect(() => {
    (async () => GetDataQueries())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (rowData) => {
    setModalData(rowData);
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    GetDataQueries(page, itemsPerPage);
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    GetDataQueries(1, value);
    setCurrentPage(1);
  };

  const deleteItem = async (uuid) => {
    const { success, message } = await DeleteItem(uuid);
    if (!success) {
      return toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return await GetDataQueries();
  };

  const data = dataQueries.map((i) => ({
    ...i,
    formData: JSON.parse(i.formData),
    filterDate: JSON.parse(i.filterDate),
  }));

  const Headers = [
    "Title",
    "Formulario",
    "Fecha de creación",
    "Reglas",
    "Acciones",
  ];

  const loadingElement = () => {
    const items = [1, 2, 3, 4, 5];
    return items.map((i) => (
      <tr className="leadSystem__table--loading" key={i}>
        {items.map((j) => (
          <th className="itemLoading" key={j}>
            <p className="itemLoading__content"></p>
          </th>
        ))}
      </tr>
    ));
  };

  const modalDate = (obj) => {
    if (Object.keys(obj).length === 0) return null;
    let dateString = "";
    const types = {
      day: "por dia:",
      month: "por mes:",
      range: ":",
    };
    if (obj.type === "month" || obj.type === "day") {
      const date = new Date(obj.date + "T00:00:00");
      if (obj.type === "month") {
        dateString = `${months[date.getMonth()]} ${date.getFullYear()}`;
      } else {
        dateString = GenereteFormatDate(date);
      }
    } else {
      const value = obj.date.split("|");
      const date0 = new Date(value[0] + "T00:00:00");
      const date1 = new Date(value[1] + "T00:00:00");
      dateString = `${GenereteFormatDate(date0)} al ${GenereteFormatDate(
        date1
      )} `;
    }

    return (
      <p className="p-2   text-end">
        {`Rango de fechas ${types[obj.type]}`}
        <br />
        <small>{dateString}</small>
      </p>
    );
  };

  return (
    <>
      {!loading && data.length === 0 ? (
        <p className="pt-4 pb-3 px-2 text-center tableQueries__message">
          Aún no ha realizado ninguna consulta.
        </p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table-hover table table-bordered table-striped leadSystem__table">
              <thead className="thead-dark">
                <tr>
                  {Headers.map((head, index) => (
                    <th scope="col" key={index}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? loadingElement()
                  : data.map((item, index) => (
                      <tr key={index}>
                        <th scope="row"> {item.title} </th>
                        <td>{item.formName}</td>
                        <td>
                          {GenereteFormatDate(new Date(item.dateCreated))}{" "}
                        </td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => openModal(item)}
                          >
                            Ver reglas
                          </button>
                        </td>
                        <td>
                          <a
                            href={`${window.adminUrl}/lead-scoring-system/leads/${item.uid}`}
                            className="btn btn-primary me-3 my-2"
                          >
                            Ver leads
                          </a>
                          <button
                            className="btn btn-danger  my-2"
                            onClick={() => deleteItem(item.uid)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <Modal
            show={showModal}
            centered
            size="lg"
            className="leadSystem__modal"
            onHide={() => setShowModal(false)}
          >
            <Modal.Header>
              <Modal.Title>{modalData.title}</Modal.Title>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </Modal.Header>
            <Modal.Body className="pt-3">
              {modalDate(modalData.filterDate ? modalData.filterDate : {})}
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col px-2 pb-3">Campo</th>
                      <th scope="col px-2 pb-3">Operador</th>
                      <th scope="col px-2 pb-">Valor</th>
                      <th scope="col px-2 pb-3">Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData.formData
                      ? modalData.formData.map((role, index) => (
                          <tr key={index}>
                            <th scope="row" className="p-3">
                              {role.field.label}
                            </th>
                            <td className="p-3">{role.operator}</td>
                            <td className="p-3">{role.value}</td>
                            <td className="p-3">{role.points}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
              <a
                href={`${window.adminUrl}/lead-scoring-system/leads/${modalData.uid}`}
                className="btn btn-primary"
              >
                Ver leads
              </a>
            </Modal.Footer>
          </Modal>

          <div className="row box-sizing">
            <div className="col-12 col-md-4">
              <span>Ver </span>
              <div className="d-inline-block mx-1">
                <select
                  className="form-control"
                  onChange={handleItemsPerPageChange}
                  value={itemsPerPage}
                >
                  {perPage.map((i, index) => (
                    <option value={i} key={index}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <span>elementos</span>
            </div>
            <div className="col-12 col-md-8 tableQueries__pagination">
              <ul className="pagination d-flex align-items-center justify-content-end">
                <li
                  className={`page-item m-1 ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={
                      currentPage !== 1
                        ? () => handlePageChange(currentPage - 1)
                        : null
                    }
                  >
                    <img
                      width={18}
                      height={18}
                      className="img-fluid"
                      src={cLeft}
                    />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
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
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={
                      currentPage !== totalPages
                        ? () => handlePageChange(currentPage + 1)
                        : null
                    }
                  >
                    <img
                      width={18}
                      height={18}
                      className="img-fluid"
                      src={cRight}
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
