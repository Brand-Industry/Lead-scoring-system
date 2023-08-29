import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const AccordiosResults = function ({ dataSubmissions, totalRolesPoints }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <Accordion className="pb-5 mb-3">
      {dataSubmissions.map((i, index) => {
        const data = {
          labels: i.fields.map((item) => item.value),
          datasets: [
            {
              label: '# of Points',
              data: i.fields.map((item) => item.points),
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
        };
        const porcentaje = (i.totalPoints / totalRolesPoints) * 100;
        return (
          <Accordion.Item eventKey={index} key={index} className="mb-2">
            <Accordion.Header className="ResultsLeads__head">
              <p className="m-0">{i.title}</p>
              <p className="m-0 me-5">
                <strong> {porcentaje.toFixed()}%</strong>
              </p>
            </Accordion.Header>
            <Accordion.Body>
              <p className="py-2">
                <strong>Campos con coincidencia</strong>
              </p>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Campo</th>
                    <th>Valor</th>
                    <th>Operador</th>
                    <th>Parametro</th>
                    <th>Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {i.fields.map((i, index) => (
                    <tr key={index}>
                      <td>{i.label}</td>
                      <td>{i.valueSubmission}</td>
                      <td>{i.operator}</td>
                      <td>{i.value}</td>
                      <td>{i.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="ResultsLeads__chart pt-4 mt-1 pb-3">
                <Doughnut data={data} width={300} height={300} />
              </div>
              <div className="pt-4 ResultsLeads__head--body">
                <p className="m-0">
                  Opportunity:
                  <strong> {porcentaje.toFixed()}%</strong>
                </p>
                <p className="m-0">
                  <a href={i.url} rel="noopener noreferrer" target="_blank">
                    Más informatión
                  </a>
                </p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
