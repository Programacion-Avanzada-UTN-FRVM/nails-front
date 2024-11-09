// LineaContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const LineaContext = createContext();

const LineaProvider = ({ children }) => {
  const [lineas, setLineas] = useState([]);

  return (
    <LineaContext.Provider value={{ lineas, setLineas }}>
      {children}
    </LineaContext.Provider>
  );
};

LineaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LineaProvider;
