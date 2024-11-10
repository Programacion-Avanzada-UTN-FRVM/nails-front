import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../App.config";
import { ClienteContext } from "./ClienteContext";
import { obtenerClientes, eliminarCliente } from "../Services/ClienteService";

export default function ListadoCliente() {
  const { clientes, setClientes } = useContext(ClienteContext);
  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    cargarClientes();
  }, [page, pageSize, consulta]);

  const cargarClientes = async () => {
    try {
      const response = await obtenerClientes(consulta, page, pageSize);
      setClientes(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const handleConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async (id) => {
    try {
      const eliminacionExitosa = await eliminarCliente(id);
      if (eliminacionExitosa) {
        cargarClientes();
      } else {
        console.error("Error al eliminar el cliente");
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...clientes];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes </h1>
        <hr />
      </div>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-5">
          <input
            id="consulta"
            name="consulta"
            className="form-control me-2"
            type="search"
            aria-label="Search"
            value={consulta}
            onChange={handleConsultaChange}
          />
        </div>
        <div className="col-1">
          <button onClick={() => cargarClientes()} className="btn btn-outline-success" type="button">
            Buscar
          </button>
        </div>
      </div>
      <hr />
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col" onClick={() => handleSort("id")}>
              #
              {sortConfig.key === "id" && (
                <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("razonSocial")}>
              Apellido y Nombre
              {sortConfig.key === "razonSocial" && (
                <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("celular")}>
              Cel
              {sortConfig.key === "celular" && (
                <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("mail")}>
              Mail
              {sortConfig.key === "mail" && (
                <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>
              )}
            </th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((cliente, indice) => (
            <tr key={indice}>
              <th scope="row">{cliente.id}</th>
              <td>{cliente.razonSocial}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.mail}</td>
              <td className="text-center">
                <div>
                  <Link to={`/cliente/${cliente.id}`} className="btn btn-link btn-sm me-3">
                    Editar
                  </Link>
                  <button onClick={() => eliminar(cliente.id)} className="btn btn-link btn-sm me-3">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-4">
          <Link to={`/cliente`} className="btn btn-success btn-sm me-3">
            Nuevo
          </Link>
        </div>
        <div className="col-4">
          <Link to={`/`} className="btn btn-info btn-sm me-3">
            Regresar
          </Link>
        </div>
      </div>

      <div className="pagination d-md-flex justify-content-md-end">
        {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
          <a
            key={pageNumber}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pageNumber);
            }}
          >
            | {pageNumber} |
          </a>
        ))}
      </div>
    </div>
  );
}
