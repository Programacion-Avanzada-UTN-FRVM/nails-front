import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ArticuloVentaContext = createContext();

const ArticuloVentaProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);

  return (
    <ArticuloVentaContext.Provider value={{ articulos, setArticulos }}>
      {children}
    </ArticuloVentaContext.Provider>
  );
};

// Validación de prop-types para children
ArticuloVentaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArticuloVentaProvider;
