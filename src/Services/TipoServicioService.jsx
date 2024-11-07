import axios from "axios";
import { API_URL } from "../App.config";

export async function obtenerTiposServicios(consulta, page, pageSize) {
  try {
    const urlBase = `${API_URL}/tiposServiciosPageQuery`;
    const { data } = await axios.get(`${urlBase}?consulta=${consulta}&page=${page}&size=${pageSize}`);
    return data;
  } catch (error) {
    console.error("Error buscando tipos de servicios:", error);
    throw error;
  }
}

export async function obtenerTiposServiciosForCombo() {
  try {
    const urlBase = `${API_URL}/tiposServicios`;
    const { data } = await axios.get(urlBase);
    return data;
  } catch (error) {
    console.error("Error buscando tipos de servicios para combo:", error);
    throw error;
  }
}

export async function obtenerTipoServicio(id) {
  try {
    const { data } = await axios.get(`${API_URL}/tiposServicios/${id}`);
    return data;
  } catch (error) {
    console.error("Error en buscar un tipo servicio:", error);
    throw error;
  }
}

export async function newTipoServicio(tipoServicio) {
  try {
    const url = tipoServicio.id > 0
      ? `${API_URL}/tiposServicios/${tipoServicio.id}`
      : `${API_URL}/tiposServicios`;

    const method = tipoServicio.id > 0 ? "PUT" : "POST";
    const { data } = await axios({ method, url, data: tipoServicio });
    return data;
  } catch (error) {
    console.error("Error al guardar el tipo de servicio:", error);
    if (error.response) {
      // Detalles específicos de la respuesta
      if (error.response.status === 400) {
        alert("Error: Los datos proporcionados son inválidos.");
      } else {
        alert(`Error del servidor: ${error.response.status}`);
      }
    } else {
      // Errores generales de red
      alert("Error al conectarse con el servidor.");
    }
    throw error;
  }
}

export async function eliminarTipoServicio(id) {
  try {
    const urlBase = `${API_URL}/tipoServicioEliminar/${id}`;
    const { data } = await axios.put(urlBase);
    return data;
  } catch (error) {
    console.error("Error al eliminar el tipo de servicio:", error);
    throw error;
  }
}
