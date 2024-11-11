import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGEN_DELETE, ITEMS_PER_PAGE } from "../App.config";
import { ServicioContext } from "./ServicioContext";
import { eliminarServicio, obtenerServicios } from "../Services/ServicioService";
import Modal from "react-bootstrap/Modal"; // Necesitarás instalar react-bootstrap para el modal

export default function ListadoServicio() {
  const { servicios, setServicios } = useContext(ServicioContext);
  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [selectedServicio, setSelectedServicio] = useState(null); // Estado para almacenar el servicio seleccionado

  useEffect(() => {
    getDatos();
  }, [page, pageSize]);

  const getDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await obtenerServicios("", page, pageSize); // Cargar todos los servicios
      setServicios(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      try {
        const eliminacionExitosa = await eliminarServicio(id);
        if (eliminacionExitosa) {
          getDatos();
        } else {
          console.error("Error al eliminar servicio");
        }
      } catch (error) {
        console.error("Error al eliminar la línea:", error);
      }
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);

    date.setDate(date.getDate() + 1);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const año = date.getFullYear();

    return `${dia}/${mes}/${año}`;
  };


  const filteredData = () => {
    const query = consulta.toLowerCase();
    const sorted = [...servicios]
      .filter((servicio) =>
        servicio.id.toString().includes(query) ||
        servicio.clienteRazonSocial.toLowerCase().includes(query) ||
        servicio.fechaDocumento.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        if (sortConfig.key === null) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });

    return sorted;
  };

  // Función para abrir el modal con los detalles del servicio
  const mostrarInfo = (servicio) => {
    setSelectedServicio(servicio);
    setShowModal(true);
  };

  const formatearTotal = (total) => {
    return total
      .toFixed(2) // Asegura dos decimales
      .replace('.', ',') // Reemplaza el punto decimal por una coma
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agrega el separador de miles
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de servicios</h1>
        <hr />
      </div>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-5">
          <input
            id="consulta"
            name="consulta"
            className="form-control"
            type="search"
            placeholder="Buscar servicio"
            value={consulta}
            onChange={handleConsultaChange}
          />
        </div>
        <div className="col-1">
          <button onClick={getDatos} className="btn btn-outline-success">
            Buscar
          </button>
        </div>
      </div>

      <hr />

      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th scope="col" onClick={() => handleSort("id")}>
                  #
                  {sortConfig.key === "id" && (
                    <span>
                      {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
                <th scope="col" onClick={() => handleSort("clienteRazonSocial")}>
                  Cliente
                  {sortConfig.key === "clienteRazonSocial" && (
                    <span>
                      {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
                <th scope="col" onClick={() => handleSort("fechaDocumento")}>
                  Fecha
                  {sortConfig.key === "fechaDocumento" && (
                    <span>
                      {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
                <th scope="col" onClick={() => handleSort("total")}>
                  Total
                  {sortConfig.key === "total" && (
                    <span>
                      {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData().map((servicio, indice) => (
                <tr key={indice}>
                  <th scope="row">{servicio.id}</th>
                  <td>{servicio.clienteRazonSocial}</td>
                  <td>{formatearFecha(servicio.fechaDocumento)}</td>
                  <td>${formatearTotal(servicio.total)}</td>
                  <td className="text-center">
                    <button
                      onClick={() => mostrarInfo(servicio)}
                      className="btn btn-link btn-sm me-3"
                    >
                      Mostrar Info
                    </button>
                    <button
                      onClick={() => eliminar(servicio.id)}
                      className="btn btn-link btn-sm me-3"
                    >
                      <img
                        src={IMAGEN_DELETE}
                        style={{ width: "20px", height: "20px" }}
                      />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="d-md-flex justify-content-md-end">
            <button
              className="btn btn-outline-primary me-2"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Anterior
            </button>
            <button
              className="btn btn-outline-primary"
              disabled={page >= totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
            >
              Siguiente
            </button>
          </div>

          <div className="row d-md-flex justify-content-md-end mt-3">
            <div className="col-4">
              <Link to={`/servicio`} className="btn btn-success btn-sm">
                Nuevo
              </Link>
            </div>
            <div className="col-4">
              <Link to={`/`} className="btn btn-info btn-sm">
                Regresar
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Modal para mostrar detalles del servicio */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Información del Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedServicio ? (
            <div>
              <p><strong>ID:</strong> {selectedServicio.id}</p>
              <p><strong>Cliente:</strong> {selectedServicio.clienteRazonSocial}</p>
              <p><strong>Fecha del Documento:</strong> {formatearFecha(selectedServicio.fechaDocumento)}</p>
              <p><strong>Total: </strong>${formatearTotal(selectedServicio.total)}</p>
              {/* Aquí puedes añadir más campos según la información disponible */}
            </div>
          ) : (
            <p>Cargando información...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
