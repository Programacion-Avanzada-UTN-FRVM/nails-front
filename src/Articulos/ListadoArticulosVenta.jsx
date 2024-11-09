import { useContext, useEffect, useState } from "react";
import { IMAGEN_EDIT, IMAGEN_DELETE, ITEMS_PER_PAGE } from "../App.config";
import { Link } from "react-router-dom";
import { obtenerArticulosVenta, eliminarArticulosVenta } from "../Services/ArticuloVentaService";
import { ArticuloVentaContext } from "./ArticuloVentaContext";

export default function ListadoArticulosVenta() {
  const { articulos, setArticulos } = useContext(ArticuloVentaContext);
  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  useEffect(() => {
    getDatos();
  }, [page, pageSize, consulta]);

  const getDatos = async () => {
    try {
      const response = await obtenerArticulosVenta(consulta, page, pageSize);
      setArticulos(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const eliminar = async (id) => {
    try {
      const eliminacionExitosa = await eliminarArticulosVenta(id);
      if (eliminacionExitosa) getDatos();
      else console.error("Error al eliminar el articulo");
    } catch (error) {
      console.error("Error al eliminar el articulo:", error);
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...articulos];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de Artículos de Venta </h1>
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
            onChange={(e) => setConsulta(e.target.value)}
          />
        </div>
        <div className="col-1">
          <button onClick={getDatos} className="btn btn-outline-success" type="button">
            Buscar
          </button>
        </div>
      </div>

      <hr />

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col" onClick={() => handleSort("id")}>
              # {sortConfig.key === "id" && <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>}
            </th>
            <th scope="col" onClick={() => handleSort("denominacion")}>
              Denominación {sortConfig.key === "denominacion" && <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>}
            </th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((articulo, indice) => (
            <tr key={indice}>
              <th scope="row">{articulo.id}</th>
              <td>{articulo.denominacion}</td>
              <td className="text-center">
                <div>
                  <Link to={`/articulo/${articulo.id}`} className="btn btn-link btn-sm me-3">
                    <img src={IMAGEN_EDIT} alt="Editar" style={{ width: "20px", height: "20px" }} />
                    Editar
                  </Link>
                  <button onClick={() => eliminar(articulo.id)} className="btn btn-link btn-sm me-3">
                    <img src={IMAGEN_DELETE} alt="Eliminar" style={{ width: "20px", height: "20px" }} />
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
          <Link to="/articulo" className="btn btn-success btn-sm me-3">
            Nuevo
          </Link>
        </div>
        <div className="col-4">
          <Link to="/" className="btn btn-info btn-sm me-3">
            Regresar
          </Link>
        </div>
      </div>

      <div className="pagination d-md-flex justify-content-md-end">
        {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
          <a key={pageNumber} href="#" onClick={(e) => { e.preventDefault(); handlePageChange(pageNumber); }}>
            | {pageNumber} |
          </a>
        ))}
      </div>
    </div>
  );
}
