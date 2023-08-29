import { useForm } from '../../hooks';
import { GenereteFormatDate } from '../ChartResults';

export const GenereteMessageDate = function () {
  const { valueFilterDate } = useForm();
  const dates = valueFilterDate.split('|').map((i) => GenereteFormatDate(new Date(i)));
  return (
    <p className="my-0 py-2 ResultsLeads__overallAverage">
      Resultados del:
      <strong> {dates.join(' al ')}</strong>
    </p>
  );
};
