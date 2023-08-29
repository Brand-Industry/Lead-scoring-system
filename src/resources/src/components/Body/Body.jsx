import { useForm } from '../../hooks';
import { SelectForm, FieldsForm, ListRole, ResultsLeads } from '../../components';

export const Body = function () {
  const { showResults } = useForm();
  return !showResults ? (
    <>
      <SelectForm />
      <FieldsForm />
      <ListRole />
    </>
  ) : (
    <ResultsLeads />
  );
};
