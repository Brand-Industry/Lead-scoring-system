import { useForm } from "../../hooks";

export const NotFoundResults = function ({ showBtn, UrlNewQuery = "" }) {
  const { newQuery } = useForm();
  return (
    <div className="text-center">
      <p className="py-2">
        No se han encontrado resultados relacionados con la búsqueda...
      </p>
      {showBtn ? (
        <button
          className="newQuery btn btn-info ResultsLeads__btn"
          onClick={newQuery}
        >
          Nueva consulta
        </button>
      ) : UrlNewQuery ? (
        <a
          href={UrlNewQuery}
          className="newQuery btn btn-info ResultsLeads__btn"
        >
          Nueva consulta
        </a>
      ) : null}
    </div>
  );
};
