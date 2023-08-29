import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from '../../hooks';

export const DayFilter = function () {
  const { setFilterDate } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilterDate('day', date);
  };

  useEffect(() => {
    setFilterDate('day', selectedDate);
  }, []);

  return (
    <>
      <label className="form-label d-block">
        <strong>Filtro por Día</strong>
      </label>
      <div>
        <DatePicker selected={selectedDate} onChange={handleDateChange} className="form-control" dateFormat="MMMM d, yyyy" />
      </div>
    </>
  );
};
