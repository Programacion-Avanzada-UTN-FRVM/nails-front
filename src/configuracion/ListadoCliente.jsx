import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ClienteContext } from "./ClienteContext";
import { ITEMS_PER_PAGE } from "../App.config";
import { Paginacion } from "../Paginacion.jsx";
import { TablaClientes } from "./TablaClientes.jsx";
import { clienteService } from "../services/ClienteService.jsx";
import { usePaginacion } from "../hooks/usePaginacion.js";

export default function ListadoCliente() {
  const { setClientes } = useContext(ClienteContext);
  const [consulta, setConsulta] = useState("");
  const { handlePageChange, page, setTotalPages, totalPages } = usePaginacion();

  const obtenerClientes = useCallback(async () => {
    const response = await clienteService.obtenerTodosLosClientes(
      consulta,
      page,
      ITEMS_PER_PAGE,
    );

    setClientes(response.content);
    setTotalPages(response.totalPages);
  }, [consulta, page, setClientes, setTotalPages]);

  async function eliminarCliente(id) {
    const eliminacionExitosa = await clienteService.eliminarCliente(id);

    if (eliminacionExitosa) {
      console.log("Cliente eliminado con éxito");
      await obtenerClientes();
    } else {
      console.error("Error al eliminar el cliente");
    }
  }

  const handConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  useEffect(() => {
    obtenerClientes().then();
  }, [obtenerClientes]);

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes </h1>
        <hr></hr>
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
            onChange={handConsultaChange}
          ></input>
        </div>
        <div className="col-1">
          <button
            onClick={() => obtenerClientes()}
            className="btn btn-outline-success"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </div>
      <hr></hr>

      <TablaClientes onEliminarCliente={eliminarCliente} />

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

      <Paginacion handlePageChange={handlePageChange} totalPages={totalPages} />
    </div>
  );
}
