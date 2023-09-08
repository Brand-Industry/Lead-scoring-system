import { post, get, del } from "../config/apiMethods";
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

export const GetQueries = async function (page = 1, pageSize = 10) {
  try {
    const { data, success, message } = await get(
      `${urlApi}/lead-scoring-system/queries/get-data?page=${page}&pageSize=${pageSize}`
    );
    if (!success || message) {
      alert(message);
      return [];
    }
    return data;
  } catch (Exception) {
    console.warn("Exception in GetQueries => " + Exception);
  }
};

export const RemoveItem = async (body) => {
  try {
    return await del(
      `${urlApi}/lead-scoring-system/queries/delete`,
      { ...body, [csrfToken["name"]]: csrfToken.value },
      {}
    );
  } catch (Exception) {
    console.warn("Exception in GetQueries => " + Exception);
  }
};
