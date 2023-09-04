import { useForm } from "../../hooks";

import "./app.scss";

export const ListRole = function () {
  const Delete = `${window.baseAssetsUrl || ""}/img/minus.svg`;
  const { dataRoles, operators, deleteRole, getDataLeads } = useForm();
  const deleteItem = (handle) => () => {
    if (!handle) return;
    deleteRole(handle);
  };

  if (!dataRoles.length > 0) return;

  return (
    <div className="table-responsive ListRole mt-3 mb-4 pb-2">
      {/* <div className="ListRole__head pb-3 pt-2">
        <h3>Lista de reglas</h3>
      </div> */}
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
                <button
                  type="button"
                  className="btn btn-danger btn-delete"
                  onClick={deleteItem(i.field.handle)}
                >
                  <img
                    src={`${Delete}`}
                    alt="Delete"
                    className="img-fluid "
                    width={20}
                    height={20}
                  />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
