import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export const GenereteDataPicker = function ({ UpdateDatePicker, selectedRange }) {
  return (
    <div className="py-3">
      <label className="form-label d-inline-block">
        <strong>Filtro por Rango de Fechas</strong>
      </label>
      <div className="d-flex align-items-center">
        <DatePicker
          className="form-control"
          selected={selectedRange[0]}
          onChange={(date) => UpdateDatePicker([date, selectedRange[1]])}
          selectsStart
          startDate={selectedRange[0]}
          endDate={selectedRange[1]}
          dateFormat="MMMM d, yyyy"
        />
        <DatePicker
          className="form-control"
          selected={selectedRange[1]}
          onChange={(date) => UpdateDatePicker([selectedRange[0], date])}
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
