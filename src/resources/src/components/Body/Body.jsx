import { useForm } from "../../hooks";
import {
  BodyLeads,
  FieldsForm,
  ResultsLeads,
  TableQueries,
} from "../../components";
import { useEffect } from "react";

export const Body = function () {
  const { showResults, sectionPage, setSectionPage } = useForm();

  useEffect(() => {
    (async () => {
      const page = window.sectionPage || "";
      return setSectionPage(page);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = {
    forms: !showResults ? <FieldsForm /> : <ResultsLeads />,
    listQueries: <TableQueries />,
    resultsLeads: <BodyLeads />,
  };

  const contentPage = sections[sectionPage];
  if (!contentPage) return NotfoundContent();
  return contentPage;
};

const NotfoundContent = () => (
  <div className="NotfoundContent">
    <p className="NotfoundContent__message">
      The section you are looking for has not been found, please check that the
      request is correct.
    </p>
  </div>
);
