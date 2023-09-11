import "./app.scss";
import { OverallAverage } from "./utils";
import { useForm } from "../../hooks";
import { useState } from "react";
import {
  ChartResults,
  GenereteMessageDate,
  LoadingResults,
  NotFoundResults,
  GenereteDataPicker,
} from "../../partials";
import { TableResults } from "../TableResults";

export const ResultsLeads = function ({ showBtnNewLeads = true }) {
  const {
    dataLeads,
    loading,
    newQuery,
    totalRolesPoints,
    typeFilterDate,
    valueFilterDate,
  } = useForm();
  const [selectedDate, setSelectedDate] = useState(false);

  let UrlNewQuery = "";
  if (!showBtnNewLeads) {
    UrlNewQuery = `${window.adminUrl || ""}/lead-scoring-system/form/${
      window.data?.formHandle || ""
    }`;
  }
  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const UpdateDatePicker = function (array = []) {
    handleRangeChange(array);
    setSelectedDate(true);
  };

  // const dataLeads_Obj = Object.values(totalLeads);
  const dataLeadsArray = Object.values(dataLeads);

  if (dataLeadsArray.length === 0)
    return (
      <NotFoundResults showBtn={showBtnNewLeads} UrlNewQuery={UrlNewQuery} />
    );

  if (loading) return <LoadingResults />;

  // const { arrayModified } = dataLeadsArray.reduce(
  //   (acc, i) => {
  //     const date = new Date(i.date + "T00:00:00");
  //     acc.arrayModified.push({ ...i, date });
  //     return acc;
  //   },
  //   { arrayModified: [] }
  // );

  const arrayModified = dataLeadsArray.map((i) => ({
    ...i,
    date: new Date(i.date),
  }));

  // const allDataSubmissions = dataLeads_Obj.map((i) => ({
  //   ...i,
  //   date: new Date(i.date),
  // }));

  arrayModified.sort((a, b) => b.date - a.date);

  const showDatePicker = !typeFilterDate && !valueFilterDate;
  const [selectedRange, setSelectedRange] = useState([
    arrayModified[arrayModified.length - 1].date ?? null,
    arrayModified[0].date ?? null,
  ]);

  const dataSubmissions = selectedDate
    ? [...arrayModified].filter((i) => {
        const [startDate, endDate] = selectedRange;
        return i.date >= startDate && i.date <= endDate;
      })
    : arrayModified;

  const promedioGeneralPorcentaje = OverallAverage(
    dataSubmissions,
    totalRolesPoints
  );

  return (
    <div className="ResultsLeads mt-2">
      <div className="ResultsLeads__headTop pb-4">
        <h2 className="ResultsLeads__title py-3 mb-0">Resultados de Leads</h2>
        {showBtnNewLeads ? (
          <button
            className="newQuery btn btn-info ResultsLeads__btn"
            onClick={newQuery}
          >
            Nueva consulta
          </button>
        ) : (
          <a
            href={UrlNewQuery}
            className="newQuery btn btn-info ResultsLeads__btn"
          >
            Nueva consulta
          </a>
        )}
      </div>
      <div
        className={`pt-4 pb-3 d-flex justify-content-between align-items-center flex-wrap`}
      >
        {showDatePicker ? (
          <GenereteDataPicker
            UpdateDatePicker={UpdateDatePicker}
            selectedRange={selectedRange}
          />
        ) : (
          <GenereteMessageDate />
        )}
        {dataSubmissions.length === 0 ? null : (
          <p className="py-2 my-0 ResultsLeads__overallAverage">
            Promedio general:
            <strong> {promedioGeneralPorcentaje.toFixed()}%</strong>
          </p>
        )}
      </div>
      {dataSubmissions.length === 0 ? (
        <div className="pt-5">
          <NotFoundResults showBtn={false} />
        </div>
      ) : (
        <>
          <div className="mb-4 pb-4">
            <ChartResults data={[...dataSubmissions].reverse()} />
          </div>
          <TableResults
            dataSubmissions={dataSubmissions}
            totalRolesPoints={totalRolesPoints}
          />
        </>
      )}
    </div>
  );
};
