export const LoadingResults = function () {
  return (
    <div className="ResultsLeads__loading py-3">
      <h3 className="ResultsLeads__title py-3">Resultados de Leads</h3>
      {[1, 2].map((i) => (
        <div className="ResultsLeads__loading--item mb-2 px-4" key={i}>
          <p className="my-0 ResultsLeads__loading--item__title col-12 col-md-6 "></p>
          <p className="my-0 ResultsLeads__loading--item__title col-12 col-md-3 ms-auto"></p>
        </div>
      ))}
    </div>
  );
};
