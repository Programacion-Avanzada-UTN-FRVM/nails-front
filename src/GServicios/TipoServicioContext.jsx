// LineaContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const TipoServicioContext = createContext();

const TipoServicioProvider = ({ children }) => {
  const [tiposServicios, setTiposServicios] = useState([]);

  return (
    <TipoServicioContext.Provider value={{ tiposServicios, setTiposServicios }}>
      {children}
    </TipoServicioContext.Provider>
  );
};

TipoServicioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TipoServicioProvider;
