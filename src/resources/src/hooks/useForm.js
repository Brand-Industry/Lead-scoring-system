import { useContext } from 'react';
import { FormContext } from '../context';
import { GetForm } from '../services/Forms';

export const useForm = () => useContext(FormContext);

export const useForms = () => {
  const getForms = () => {
    return window.freeFormsData;
  };
  return { getForms };
};

export const useSelectedForm = () => {
  const getForm = async (handle) => {
    return await GetForm(handle);
  };

  return {
    getForm
  };
};
