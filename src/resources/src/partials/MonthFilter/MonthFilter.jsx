import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "../../hooks";

export const MonthFilter = function () {
  const { setFilterDate } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilterDate("month", date);
  };

  useEffect(() => {
    setSelectedDate(selectedDate.setDate(1));
    setFilterDate("month", selectedDate);
  }, []);

  return (
    <DatePicker
      selected={selectedDate}
      className="form-control"
      onChange={handleDateChange}
      dateFormat="MMMM yyyy"
      showMonthYearPicker
    />
  );
};
