import { useForm } from '../../hooks';

import './app.scss';

export const ListRole = function () {
  const { dataRoles, operators, deleteRole, getDataLeads } = useForm();
  const deleteItem = (handle) => () => {
    if (!handle) return;
    deleteRole(handle);
  };

  if (!dataRoles.length > 0) return;

  return (
    <div className="table-responsive ListRole mt-3">
      <div className="ListRole__head pb-3 pt-2">
        <h3>Lista de reglas</h3>
      </div>
      <table className="table ListRole__table">
        <thead>
          <tr>
            <th scope="col">Campo</th>
            <th scope="col">Operador</th>
            <th scope="col">Valor</th>
            <th scope="col">Puntos</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {dataRoles.map((i, index) => (
            <tr key={index}>
              <th>{i.field.label}</th>
              <th>{operators[i.operator]}</th>
              <th>{i.value}</th>
              <th>{i.points}</th>
              <th scope="row">
                <button type="button" className="btn btn-danger" onClick={deleteItem(i.field.handle)}>
                  Eliminar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="my-3 btn btn-primary" onClick={getDataLeads}>
        Consultar
      </button>
    </div>
  );
};
