import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from '../../hooks';
import { DayFilter, MonthFilter, RangeFilter } from '../../partials';

import './style.scss';

export const DateFilter = function () {
  const { setFilterDate } = useForm();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    setFilterDate('', '');
  };

  const typesFilters = {
    day: <DayFilter />,
    month: <MonthFilter />,
    range: <RangeFilter />
  };

  return (
    <div className="mb-4 chooseDate">
      <label className="form-label d-inline-block">
        <strong>Consulta por fechas</strong>
      </label>
      <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Elegir una opción</option>
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="range">Date Range</option>
      </select>
      <div className="mt-4">{selectedOption ? typesFilters[selectedOption] : ''}</div>
    </div>
  );
};
