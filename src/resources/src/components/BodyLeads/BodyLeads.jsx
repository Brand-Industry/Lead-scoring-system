import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { ResultsLeads } from "../ResultsLeads";
import { LoadingResults } from "../../partials";

export const BodyLeads = () => {
  const { getDataLeads, dataLeads, setTotalRolesPoints } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(false);
      const data = window.data || {};
      if (Object.keys(data).length === 0) return;

      const { filterDate, formData, formHandle, formName } = data;
      const fDateJson = JSON.parse(filterDate);
      const fFormdataJson = JSON.parse(formData);
      const totalPoints = fFormdataJson.reduce(
        (acc, obj) => acc + obj.points,
        0
      );

      await setTotalRolesPoints(totalPoints);
      await getDataLeads(
        formHandle,
        fFormdataJson,
        formName,
        fDateJson.type || "",
        fDateJson.date || "",
        false
      );
      return setLoading(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dataLeads === undefined || !loading) return <LoadingResults />;

  return <ResultsLeads showBtnNewLeads={false} />;
};
