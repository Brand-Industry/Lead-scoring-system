import { createContext, useEffect, useState } from "react";
import { useForms, useSelectedForm } from "../hooks";
import { GetLeads } from "../services/Leads";
import { SaveQuery } from "../services/FormQueries";

export const FormContext = createContext({
  forms: [],
  formActive: "",
  selectedForm: [],
  operators: {},
  setForm: () => {},
  dataRoles: [],
  addRole: () => {},
  deleteRole: () => {},
  dataLeads: [],
  getDataLeads: () => {},
  selectedValue: "",
  setSelectedValue: () => {},
  operatorField: "",
  setOperatorField: () => {},
  valueField: "",
  setValueField: () => {},
  pointsField: 1,
  setPointsFields: () => {},
  totalRolesPoints: 0,
  loadding: false,
  showResults: false,
  newQuery: () => {},
  typeFilterDate: "",
  valueFilterDate: "",
  sectionPage: "",
  setSectionPage: () => {},
  getResults: () => {},
});

export const FormProvider = function (props) {
  const { children } = props;
  const { getForm } = useSelectedForm();
  //const [forms, setForms] = useState([]);
  const [formActive, setFormActive] = useState("");
  const [formName, setFormName] = useState("");
  const [selectedForm, setSelectedForm] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [operatorField, setOperatorField] = useState("");
  const [valueField, setValueField] = useState("");
  const [pointsField, setPointsFields] = useState(1);
  const [totalRolesPoints, setTotalRolesPoints] = useState(0);
  const [dataLeads, setDataLeads] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [typeFilterDate, setTypeFilterDate] = useState("");
  const [valueFilterDate, setValueFilterDate] = useState("");
  const [sectionPage, setSectionPage] = useState("");

  const resetElements = () => {
    setSelectedValue("");
    setOperatorField("");
    setValueField("");
    setPointsFields(1);
    setDataRoles([]);
    setDataLeads(undefined);
  };

  const setForm = async function () {
    const handle = window.formHandle || null;
    const formName = window.formName || "";
    if (!handle) {
      resetElements();
      return setSelectedForm([]);
    }
    const dataFields = await getForm(handle);
    if (!dataFields) return;
    setSelectedForm(dataFields);
    setFormActive(handle);
    setFormName(formName);
    resetElements();
  };

  const newQuery = () => {
    setSelectedForm([]);
    setFormActive("");

    resetElements();
    setFilterDate("", "");
    return setShowResults(false);
  };

  const addRole = async () => {
    if (totalRolesPoints === 100 || totalRolesPoints > 100) return;

    setDataRoles([
      ...dataRoles,
      {
        field: JSON.parse(selectedValue),
        operator: operatorField,
        value: valueField,
        points: pointsField,
      },
    ]);
    setTotalRolesPoints(parseInt(totalRolesPoints) + parseInt(pointsField));
  };

  const deleteRole = (handle) => {
    const indice = dataRoles.findIndex(
      (objeto) => objeto.field.handle === handle
    );
    if (!indice === -1) return;
    const newData = [...dataRoles];
    const { points } = dataRoles[indice];
    newData.splice(indice, 1);
    setTotalRolesPoints(parseInt(totalRolesPoints) - parseInt(points));
    if (dataRoles.length === 1) {
      setDataLeads(undefined);
    }
    setDataRoles(newData);
  };

  const getResults = async () => {
    await getDataLeads(
      formActive,
      dataRoles,
      formName,
      typeFilterDate,
      valueFilterDate
    );
  };

  const getDataLeads = async (
    form,
    roles,
    fName,
    tfilterDate,
    vfilterDate,
    isSaved = true
  ) => {
    if (!roles.length > 0) return;
    setDataLeads(undefined);
    setLoading(true);

    const BodyValues = {
      formHandle: form,
      formData: roles,
      filterDate: {},
      formName: fName,
    };

    if (tfilterDate && vfilterDate) {
      BodyValues["filterDate"] = {
        type: tfilterDate,
        date: vfilterDate,
      };
    }

    const responseLeads = await GetLeads(BodyValues);
    const { data } = responseLeads;
    if (!data) return;
    if (isSaved) {
      const { success, message } = await SaveQuery(BodyValues);
      if (!success) console.warn(message);
    }
    setLoading(false);
    setDataLeads(data);
    setShowResults(true);
  };

  const generateDate = function (date) {
    try {
      if (!date) return "";
      return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
        -2
      )}-${("0" + date.getDate()).slice(-2)}`;
    } catch (Exception) {
      console.warn("Exception in generateDate => " + Exception);
    }
  };
  const setFilterDate = function (type, date) {
    try {
      if (!type || !date) {
        setTypeFilterDate("");
        setValueFilterDate("");
        return;
      }
      setTypeFilterDate(type);

      if (type === "range") {
        const [start, end] = date;
        setValueFilterDate(`${generateDate(start)}|${generateDate(end)}`);
        return;
      }

      return setValueFilterDate(generateDate(date));
    } catch (Exception) {
      console.warn("Exception in setFilterDate => " + Exception);
    }
  };

  //useEffect(() => {
  //(async () => {
  //const responseForms = a getForms();
  //if (responseForms) {
  //setForms(responseForms);
  //}
  //})();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, []);

  const valueContext = {
    setForm,
    selectedForm,
    dataRoles,
    addRole,
    deleteRole,
    formActive,
    operators: {
      contiene: "Contiene",
      "contiene-mm": "Contiene (no distingue entre mayúsculas y minúsculas)",
      "no-contiene": "No contiene",
      "no-contiene-mm":
        "No contiene (no distingue entre mayúsculas y minúsculas)",
      "mayor-que": "Mayor que",
      "menor-que": "Menor que",
      "es-igual-a": "Es igual que",
      "no-es-igual-a": "No es igual que",
      coincide: "Coincide con la expresión regular",
      "no-coincide": "No coincide con la expresión regular",
    },
    getDataLeads,
    selectedValue,
    setSelectedValue,
    operatorField,
    setOperatorField,
    valueField,
    setValueField,
    pointsField,
    setPointsFields,
    totalRolesPoints,
    dataLeads,
    loading,
    showResults,
    newQuery,
    setFilterDate,
    typeFilterDate,
    valueFilterDate,
    setSectionPage,
    sectionPage,
    getResults,
    setTotalRolesPoints,
  };

  return (
    <FormContext.Provider value={valueContext}>{children}</FormContext.Provider>
  );
};
