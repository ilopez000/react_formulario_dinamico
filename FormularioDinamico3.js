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
    // Crea un nuevo arreglo filtrando el elemento que tiene el id proporcionado
    const newInputs = inputs.filter(input => input.id !== id);
    // Actualiza el estado de inputs con el nuevo arreglo
    setInputs(newInputs)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar que todos los campos tienen valores
    const allFieldsFilled = inputs.every(input => input.value.trim() !== '');
  
    if (!allFieldsFilled) {
      alert('Todos los campos deben estar llenos.');
      return; // Detener la función aquí si hay campos vacíos
    }
  

    console.log('Datos enviados:', inputs);
    // Aquí iría la lógica de envío real, como una petición a una API
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
