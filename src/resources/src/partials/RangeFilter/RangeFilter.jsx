import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from '../../hooks';

export const RangeFilter = function () {
  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);
  const { setFilterDate } = useForm();

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    setFilterDate('range', range);
  };

  useEffect(() => {
    setFilterDate('range', selectedRange);
  }, []);

  return (
    <div>
      <label className="form-label d-inline-block">Filtro por Rango de Fechas</label>
      <div className="d-flex align-items-center">
        <DatePicker
          className="form-control"
          selected={selectedRange[0]}
          onChange={(date) => handleRangeChange([date, selectedRange[1]])}
          selectsStart
          startDate={selectedRange[0]}
          endDate={selectedRange[1]}
          dateFormat="MMMM d, yyyy"
        />
        <DatePicker
          className="form-control"
          selected={selectedRange[1]}
          onChange={(date) => handleRangeChange([selectedRange[0], date])}
          selectsEnd
          startDate={selectedRange[0]}
          endDate={selectedRange[1]}
          dateFormat="MMMM d, yyyy"
          minDate={selectedRange[0]}
        />
      </div>
    </div>
  );
};
