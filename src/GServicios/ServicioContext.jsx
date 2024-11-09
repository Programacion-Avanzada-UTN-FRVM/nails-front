// LineaContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const ServicioContext = createContext();

const ServicioProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);

  return (
    <ServicioContext.Provider value={{ servicios, setServicios }}>
      {children}
    </ServicioContext.Provider>
  );
};

ServicioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ServicioProvider;
