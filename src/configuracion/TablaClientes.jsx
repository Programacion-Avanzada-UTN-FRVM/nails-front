import { Link } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";

import { ClienteContext } from "./ClienteContext.jsx";
import { useSort } from "../hooks/useSort.js";

export function TablaClientes({ onEliminarCliente }) {
  const { clientes } = useContext(ClienteContext);
  const { handleSort, sortConfig, itemsOrdenados } = useSort(clientes);

  return (
    <table className="table table-striped table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th scope="col" onClick={() => handleSort("id")}>
            #
            {sortConfig.key === "id" && (
              <span>
                {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
              </span>
            )}
          </th>
          <th scope="col" onClick={() => handleSort("razonSocial")}>
            Apellido y Nombre
            {sortConfig.key === "razonSocial" && (
              <span>
                {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
              </span>
            )}
          </th>
          <th scope="col" onClick={() => handleSort("celular")}>
            Cel
            {sortConfig.key === "celular" && (
              <span>
                {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
              </span>
            )}
          </th>
          <th scope="col" onClick={() => handleSort("mail")}>
            Mail
            {sortConfig.key === "mail" && (
              <span>
                {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
              </span>
            )}
          </th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {itemsOrdenados.map((cliente, indice) => (
          <tr key={indice}>
            <th scope="row">{cliente.id}</th>
            <td>{cliente.razonSocial}</td>
            <td>{cliente.celular}</td>
            <td>{cliente.email}</td>

            <td className="text-center">
              <div>
                <Link
                  to={`/cliente/${cliente.id}`}
                  className="btn btn-link btn-sm me-3"
                >
                  Editar
                </Link>

                <button
                  onClick={() => onEliminarCliente(cliente.id)}
                  className="btn btn-link btn-sm me-3"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TablaClientes.propTypes = {
  onEliminarCliente: PropTypes.func.isRequired,
};
