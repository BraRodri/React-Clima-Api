import React, { Fragment, useState, useEffect } from "react";

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //use del useState
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [guardar, setGuardar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  //extraer
  const { ciudad, pais } = busqueda;

  //uso del useEffect
  useEffect(() => {
    const consultarAPI = async () => {
      if (guardar) {
        const appId = "486d6730dee939468e0ecb1c1f09ed7c";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultadoP = await respuesta.json();

        setResultado(resultadoP);
        setGuardar(false);

        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guardar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay Resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setGuardar={setGuardar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
