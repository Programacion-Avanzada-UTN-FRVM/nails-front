import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  newArticuloVenta,
  obtenerArticuloVenta,
} from "../Services/ArticuloVentaService";
import { obtenerLineas2 } from "../Services/LineaService";
import PropTypes from "prop-types";


export default function ArticuloVenta({ title }) {
  let navegacion = useNavigate();
  const { id } = useParams();

  const [articulo, setArticulo] = useState({
    denominacion: "",
    linea: 0,
  });

  const [listaLineas, setListaLineas] = useState([]);
  const [selectedLinea, setSelectedLinea] = useState("");
  const { denominacion } = articulo;

  useEffect(() => {
    cargarModel();
    cargarLineas();
  });

  const cargarModel = async () => {
    if (id > 0) {
      const resultado = await obtenerArticuloVenta(id);
      setArticulo(resultado);
      setSelectedLinea(resultado.linea);
    }
  };

  const cargarLineas = async () => {
    const resultado = await obtenerLineas2();
    setListaLineas(resultado);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setArticulo({ ...articulo, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...articulo,
      linea: selectedLinea, // Solo el ID de la línea
    };

    try {
      await newArticuloVenta(data); 
      navegacion("/articuloList"); 
    } catch (error) {
      console.error("Error al guardar el artículo de venta:", error);
      alert("Hubo un problema al guardar el artículo. Intente nuevamente.");
    }
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de artículo / {title} </h1>
        <hr />
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="denominacion" className="form-label">
            Denominación
          </label>
          <input
            type="text"
            className="form-control"
            id="denominacion"
            name="denominacion"
            required
            value={denominacion}
            onChange={onInputChange}
          />

          <label htmlFor="listaLineas">Selecciona una línea:</label>
          <select
            id="listaLineas"
            value={selectedLinea}
            required
            onChange={(e) => setSelectedLinea(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {listaLineas.map((linea) => (
              <option key={linea.id} value={linea.id}>
                {linea.denominacion}
              </option>
            ))}
          </select>
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/articuloList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

ArticuloVenta.propTypes = {
  title: PropTypes.node.isRequired,
};