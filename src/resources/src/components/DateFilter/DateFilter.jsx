import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "../../hooks";
import { DayFilter, MonthFilter, RangeFilter } from "../../partials";

import "./style.scss";

export const DateFilter = function () {
  const { setFilterDate } = useForm();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    setFilterDate("", "");
  };

  const typesFilters = {
    day: <DayFilter />,
    month: <MonthFilter />,
    range: <RangeFilter />,
  };

  return (
    <div className="mb-2 chooseDate text-end">
      <div className="form-floating d-inline-block">
        <select
          className="form-select "
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Elegir una opción</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="range">Date Range</option>
        </select>
        <label className="form-label ">
          <strong>Consulta por fechas</strong>
        </label>
      </div>
      {selectedOption ? (
        <div className="mt-4 mb-3">{typesFilters[selectedOption]}</div>
      ) : (
        ""
      )}
    </div>
  );
};
