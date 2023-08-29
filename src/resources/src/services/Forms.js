import { post } from '../config/apiMethods';

export const GetForm = async function (handle) {
  try {
    const { data, error, success } = await post(
      '/actions/system-leads/get-form/get-data',
      {
        formHandle: handle
      },
      {}
    );
    if (!success || error) return console.warn(error);
    return data;
  } catch (Exception) {
    console.warn('Exception in GetForm => ' + Exception);
  }
};
