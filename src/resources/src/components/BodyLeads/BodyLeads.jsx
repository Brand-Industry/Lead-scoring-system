import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { ResultsLeads } from "../ResultsLeads";
import { LoadingResults } from "../../partials";

export const BodyLeads = () => {
  const { getResults, dataLeads } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(false);
      getResults();
      return setLoading(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dataLeads === undefined || !loading) return <LoadingResults />;

  return <ResultsLeads showBtnNewLeads={false} />;
};
