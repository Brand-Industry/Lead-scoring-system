import { useForm } from "../../hooks";
import "./app.scss";
import { DateFilter } from "../DateFilter";
import { useEffect, useState } from "react";
import { ListRole } from "../ListRole";
// import Add from "../../assets/add.svg";

export const FieldsForm = function () {
  const Add = `${window.baseAssetsUrl || ""}/img/add.svg`;
  const Search = `${window.baseAssetsUrl || ""}/img/search.svg`;
  const [errors, setErrors] = useState([]);
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
    totalRolesPoints,
    getDataLeads,
    dataRoles,
    setForm,
  } = useForm();

  const handleChange = (stateSetter) => (event) => {
    const { value } = event.target;
    stateSetter(value);
  };

  const changePoints = (event) => {
    const { value } = event.target;
    if (!value) return;
    const parseValue = parseInt(value);
    if (parseValue > 100) return setPointsFields(100);
    return setPointsFields(parseValue);
  };

  const addField = async function () {
    const validationFields = [
      { key: "field", value: selectedValue },
      { key: "operator", value: operatorField },
      { key: "value", value: valueField },
    ];

    const missingFields = validationFields
      .filter((i) => !i.value)
      .map((i) => i.key);

    if (missingFields.length > 0 || pointsField === 0) {
      setErrors([...missingFields, pointsField === 0 ? "points" : null]);
      return;
    }

    if (totalRolesPoints === 100 || totalRolesPoints > 100) return;

    addRole();
    setErrors([]);
    setSelectedValue("");
    setOperatorField("");
    setValueField("");
    setPointsFields(1);
  };

  useEffect(() => {
    (async () => {
      setForm();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedForm.length > 0)
    return <p>Debe selecionar un formulario para continar con el proceso.</p>;

  return (
    <div className="pb-4 FieldsForm px-2  box-sizing">
      <div className="row box-sizing mb-4">
        <div className="col-12 col-md-6">
          <h2 className="py-3">Reglas que deben cumplirse</h2>
        </div>
        <div className="col-12 col-md-6 FieldsForm__col">
          <DateFilter />
        </div>
      </div>
      <ListRole />

      <form className="row gy-3">
        <div className="col-12 col-md-3  FieldsForm__col">
          <div className="form-floating">
            <select
              className={`form-select ${
                errors.includes("field") ? "is-invalid" : ""
              }`}
              value={selectedValue}
              onChange={handleChange(setSelectedValue)}
            >
              <option value="">Elegir Campo</option>
              {selectedForm.map((i, index) => (
                <option
                  value={JSON.stringify({ handle: i.handle, label: i.label })}
                  key={index}
                >
                  {i.label}
                </option>
              ))}
            </select>
            <label className="form-label d-inline-block">
              <strong>Campo</strong>
            </label>
          </div>
        </div>
        <div className="col-12 col-md-3 FieldsForm__col">
          <div className="form-floating">
            <select
              className={`form-select ${
                errors.includes("operator") ? "is-invalid" : ""
              }`}
              value={operatorField}
              onChange={handleChange(setOperatorField)}
            >
              <option value="">Elegir Operador</option>
              {Object.keys(operators).map((i, index) => (
                <option value={i} key={index}>
                  {operators[i]}
                </option>
              ))}
            </select>
            <label className="">
              <strong>Operador</strong>
            </label>
          </div>
        </div>
        <div className="col-12 col-md-3 FieldsForm__col">
          <div className="form-floating">
            <input
              type="text"
              autoComplete="false"
              placeholder=""
              className={`form-control ${
                errors.includes("value") ? "is-invalid" : ""
              }`}
              value={valueField}
              onChange={handleChange(setValueField)}
            />
            <label className="">
              <strong>Valor</strong>
            </label>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-2 FieldsForm__col">
          <div className="form-floating">
            <input
              placeholder=""
              className={`form-control ${
                errors.includes("points") ? "is-invalid" : ""
              }`}
              type="number"
              autoComplete="false"
              min={1}
              max={100}
              step={1}
              onChange={changePoints}
              value={pointsField}
            />
            <label className="">
              <strong>Puntos</strong>
            </label>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-1 FieldsForm__col FieldsForm__contentAdd">
          <button type="button" onClick={addField} className="btn btn-primary">
            <img
              src={Add}
              alt="Add"
              width={26}
              height={26}
              className="img-fluid"
            />
          </button>
        </div>
      </form>
      {dataRoles.length > 0 ? (
        <div className="d-inline-block mt-3 pt-3">
          <button
            type="button"
            className="btn-search btn btn-primary"
            onClick={getDataLeads}
          >
            <img
              src={Search}
              alt="Search"
              className="img-fluid me-2"
              width={20}
              height={20}
            />
            Consultar
          </button>
        </div>
      ) : null}
    </div>
  );
};
