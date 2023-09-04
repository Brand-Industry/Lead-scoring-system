import { post } from "../config/apiMethods";
import { urlApi, csrfToken } from "../config/environment";

export const SaveQuery = async function (body) {
  try {
    const { data, error, success } = await post(
      `${urlApi}/lead-scoring-system/form-queries/save-query`,
      { ...body, [csrfToken["name"]]: csrfToken.value },
      {}
    );
    if (!success || error) return alert(error);
    return data;
  } catch (Exception) {
    console.warn("Exception in SaveQuery => " + Exception);
  }
};
