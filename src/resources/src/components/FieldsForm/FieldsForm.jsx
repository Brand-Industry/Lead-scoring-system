import { useForm } from '../../hooks';
import './app.scss';
import { DateFilter } from '../DateFilter';

export const FieldsForm = function () {
  const {
    selectedForm,
    addRole,
    operators,
    selectedValue,
    setSelectedValue,
    operatorField,
    setOperatorField,
    valueField,
    setValueField,
    pointsField,
    setPointsFields,
    totalRolesPoints
  } = useForm();

  const handleChange = (stateSetter) => (event) => {
    const { value } = event.target;
    stateSetter(value);
  };

  const changePoints = (event) => {
    const { value } = event.target;
    if (value > 100) return setPointsFields(100);
    return setPointsFields(value);
  };

  const addField = async function () {
    if (!operatorField || !selectedValue || !valueField || pointsField === 0) return;
    if (totalRolesPoints === 100 || totalRolesPoints > 100) return;
    addRole();
    setSelectedValue('');
    setOperatorField('');
    setValueField('');
    setPointsFields(1);
  };

  if (!selectedForm.length > 0) return <p>Debe selecionar un formulario para continar con el proceso.</p>;

  return (
    <div className="py-4 FieldsForm">
      <h2 className="py-3">Condicion que deben cumplirse</h2>

      <div className="col-12 col-md-5">
        <DateFilter />
      </div>

      <form className="row gy-3">
        <div className="col-12 col-md-3  FieldsForm__col">
          <label className="form-label d-inline-block">
            <strong>Campo</strong>
          </label>

          <select className="form-select" value={selectedValue} onChange={handleChange(setSelectedValue)}>
            <option value="">Elegir Campo</option>
            {selectedForm.map((i, index) => (
              <option value={JSON.stringify({ handle: i.handle, label: i.label })} key={index}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3 FieldsForm__col">
          <label className="form-label d-inline-block">
            <strong>Operador</strong>
          </label>
          <select className="form-select" value={operatorField} onChange={handleChange(setOperatorField)}>
            <option value="">Elegir Operador</option>
            {Object.keys(operators).map((i, index) => (
              <option value={i} key={index}>
                {operators[i]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3 FieldsForm__col">
          <label className="form-label d-inline-block">
            <strong>Valor</strong>
          </label>
          <input type="text" autoComplete="false" className="form-control" value={valueField} onChange={handleChange(setValueField)} />
        </div>
        <div className="col-12 col-md-3 col-lg-2 FieldsForm__col">
          <label className="form-label d-inline-block">
            <strong>Puntos</strong>
          </label>
          <input type="number" autoComplete="false" min={1} max={100} step={1} className="form-control" onChange={changePoints} value={pointsField} />
        </div>
        <div className="col-12 col-md-3 col-lg-1 FieldsForm__col FieldsForm__contentAdd">
          <button type="button" onClick={addField} className="btn btn-primary">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};
