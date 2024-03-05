import React, { useState } from 'react';

function FormularioDinamico() {
  const [inputs, setInputs] = useState([
    { id: 1, value: '' },
  ]);

  const handleAddField = () => {
    const newId = inputs.length ? inputs[inputs.length - 1].id + 1 : 1;
    setInputs([...inputs, { id: newId, value: '' }]);
  };

  const handleChange = (id, event) => {
    const newInputs = inputs.map(input => {
      if (input.id === id) {
        return { ...input, value: event.target.value };
      }
      return input;
    });
    setInputs(newInputs);
  };

  const handleRemoveField = (id) => {
    const newInputs = inputs.filter(input => input.id !== id);
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos enviados:', inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div key={input.id}>
          <label htmlFor={`input-${input.id}`}>Input {index + 1}</label>
          <input
            id={`input-${input.id}`}
            type="text"
            value={input.value}
            onChange={(e) => handleChange(input.id, e)}
          />
          {/* Añadir botón de eliminar aquí */}
          {inputs.length > 1 && (
            <button type="button" onClick={() => handleRemoveField(input.id)}>
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddField}>Añadir Campo</button>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioDinamico;
