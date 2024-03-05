import React, { useState } from 'react';

function FormularioDinamico() {
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
  const [error, setError] = useState('');

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
    // Comprobar que todos los campos tienen contenido
    const allFieldsFilled=inputs.every(input => input.value.includes('@'));
    if (!allFieldsFilled) {
      setError('Todos los campos deben tener @.');
      return;
    }
    

    setError(''); // Limpiar el mensaje de error si todo está correcto
    console.log('Datos enviados:', inputs);
    // Aquí iría la lógica de envío, como una petición a una API
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
          {inputs.length > 1 && (
            <button type="button" onClick={() => handleRemoveField(input.id)}>Eliminar</button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddField}>Añadir Campo</button>
      <button type="submit">Enviar</button>
      {error && <div style={{ marginTop: '10px', color: 'red' }}>{error}</div>}
    </form>
  );
}

export default FormularioDinamico;
