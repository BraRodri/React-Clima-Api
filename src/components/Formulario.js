import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({ busqueda, setBusqueda, setGuardar }) => {
  const [error, setError] = useState(false);

  //extraer
  const { ciudad, pais } = busqueda;

  //onChange
  const Change = (e) => {
    //actualizar el state
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //onSubmit
  const Submit = (e) => {
    e.preventDefault();

    //validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    //enviar
    setGuardar(true);
  };

  return (
    <form onSubmit={Submit}>
      {error ? <Error mensaje="Todos los campos son obligatorios!" /> : null}

      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={Change}
        />
        <label htmlFor="ciudad">Ciudad</label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={Change}>
          <option value="">Seleccione un País...</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País</label>
      </div>
      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Clima"
          className="waves-effect waves-light btn-large btn-block yellow accent-4"
        />
      </div>
    </form>
  );
};

export default Formulario;