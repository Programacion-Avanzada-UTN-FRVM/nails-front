import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ClienteContext = createContext({});

const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  return (
    <ClienteContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClienteContext.Provider>
  );
};

export default ClienteProvider;

ClienteProvider.propTypes = {
  children: PropTypes.node,
};
