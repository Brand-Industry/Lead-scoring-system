import { post } from '../config/apiMethods';

export const GetLeads = async function (body) {
  try {
    const { data, error, success } = await post('/actions/system-leads/get-submits/get-submission', body, {});
    if (!success || error) return console.warn(error);
    return data;
  } catch (Exception) {
    console.warn('Exception in GetLeads => ' + Exception);
  }
};
