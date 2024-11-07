import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  newTipoServicio,
  obtenerTipoServicio,
} from "../Services/TipoServicioService";

export default function TipoServicio({ title }) {
  const navegacion = useNavigate();
  const { id } = useParams();

  const [tipoServicio, setTipoServicio] = useState({
    denominacion: "",
  });

  const { denominacion } = tipoServicio;

  useEffect(() => {
    cargarTipoServicio();
  }, []);

  const cargarTipoServicio = async () => {
    if (id > 0) {
      try {
        const resultado = await obtenerTipoServicio(id);
        setTipoServicio(resultado);
      } catch (error) {
        console.error("Error al cargar el tipo de servicio:", error);
        alert("Hubo un problema al cargar el tipo de servicio. Intente nuevamente.");
      }
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setTipoServicio({ ...tipoServicio, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await newTipoServicio(tipoServicio);
      navegacion("/tipoServicioList");
    } catch (error) {
      console.error("Error al guardar el tipo de servicio:", error);
      alert("Hubo un problema al guardar el tipo de servicio. Intente nuevamente.");
    }
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de tipo servicio / {title} </h1>
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
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/tipoServicioList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
