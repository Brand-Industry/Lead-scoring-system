import { GenereteFormatDate } from '../../partials';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './styles.scss';
export const TableResults = function ({ dataSubmissions, totalRolesPoints }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const pageSizes = [50, 100, 200, 500, 800];

  const openModal = (rowData) => {
    setModalData(rowData);
    setShowModal(true);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = dataSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataSubmissions.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="table-responsive tableResults">
        <table className="table table-striped">
          <thead className="tableResults__head">
            <tr>
              <th className="py-3">Título</th>
              <th className="py-3">Fecha de Creación</th>
              <th className="py-3">Coincidencia</th>
              <th className="py-3"> % </th>
              <th className="py-3">URL</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => {
              const porcentaje = (row.totalPoints / totalRolesPoints) * 100;
              return (
                <tr key={index} className="tableResults__items" onClick={() => openModal(row)}>
                  <td className="py-3">{row.title}</td>
                  <td className="py-3">{GenereteFormatDate(row.date)}</td>
                  <td className="py-3 text-center">{row.fields.length}</td>
                  <td className="py-3">{porcentaje.toFixed()} %</td>
                  <td className="py-3">
                    <a href={row.url} rel="noopener noreferrer" target="_blank">
                      Ver formulario
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={showModal} centered size="lg" className="leadSystem__modal" onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>{modalData.title}</Modal.Title>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </Modal.Header>
          <Modal.Body className="py-4">
            <div className="row gy-3 my-3 box-sizing px-3">
              <div className="col-12 col-md-6 text-center">
                <p>
                  <strong>Fecha de Creación: </strong>
                  {GenereteFormatDate(modalData.date)}{' '}
                </p>
              </div>
              <div className="col-12 col-md-6 text-center">
                <p>
                  <strong>Porcentaje: </strong>
                  {((modalData.totalPoints / totalRolesPoints) * 100).toFixed()} %
                </p>
              </div>
            </div>
            {Object.keys(modalData).length === 0 ? null : (
              <Doughnut
                data={{
                  labels: modalData.fields.map((item) => item.value),
                  datasets: [
                    {
                      label: '# of Points',
                      data: modalData.fields.map((item) => item.points),
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                    }
                  ]
                }}
                width={300}
                height={300}
              />
            )}
            <div className="table-responsive mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Campo</th>
                    <th scope="col">Valor del campo</th>
                    <th scope="col">Operador</th>
                    <th scope="col">Condicional</th>
                    <th scope="col">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {(modalData.fields || []).map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td>{item.valueSubmission}</td>
                      <td>{item.operator}</td>
                      <td>{item.value}</td>
                      <td>{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <a href={modalData.url} rel="noopener noreferrer" target="_blank" className="btn btn-primary">
              Ver formulario
            </a>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="row box-sizing">
        <div className="col-12 col-md-6 box-sizing tableResults__pageSize">
          <label>
            Resultados por página:
            <select value={pageSize} className="form-control ms-2" onChange={handlePageSizeChange}>
              {pageSizes.map((i, index) => (
                <option value={i} key={index}>
                  {i}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-12 col-md-6 box-sizing">
          <ul className="tableResults__pagination justify-content-end d-flex flex-wrap align-items-center box-sizing">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li className="m-1" key={index}>
                <button className={`tableResults__pagination--btn ${currentPage == index + 1 ? 'active' : ''}`} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
