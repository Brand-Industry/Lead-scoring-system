import { useState } from 'react';
import { useForm } from '../../hooks';

import './app.scss';

export const SelectForm = function () {
  const { forms, setForm } = useForm();
  const [selectedForm, setSelectedForm] = useState('');

  const handleSelectChange = async (event) => {
    const { value } = event.target;
    setSelectedForm(value);
    await setForm(value);
  };

  return (
    <form className="selectForm">
      <div className="col-12 col-md-4">
        <label htmlFor="selectForm" className="form-label d-inline-block">
          <strong>Formularios</strong>
        </label>
        <select className="form-select" id="selectForm" value={selectedForm} onChange={handleSelectChange}>
          <option value="">Elegir formulario</option>
          {forms.map((i, index) => (
            <option value={i.handle} key={index}>
              {i.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
