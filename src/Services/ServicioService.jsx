import axios from "axios";
import { API_URL } from "../App.config";

const urlBaseServicios = `${API_URL}/servicios`;

// Obtener una lista paginada de servicios
export async function obtenerServicios(consulta, page, pageSize) {
  try {
    const { data } = await axios.get(`${urlBaseServicios}PageQuery`, {
      params: { consulta, page, size: pageSize },
    });
    return data;
  } catch (error) {
    console.error("Error buscando servicios:", error);
    throw new Error("No se pudo obtener la lista de servicios.");
  }
}

// Obtener un servicio por su ID
export async function obtenerServicio(id) {
  try {
    const { data } = await axios.get(`${urlBaseServicios}/${id}`);
    return data;
  } catch (error) {
    console.error("Error al buscar un servicio:", error);
    throw new Error("No se pudo obtener el servicio especificado.");
  }
}

// Crear o actualizar un servicio
export async function newServicio(servicio) {
  try {
    const url = `${urlBaseServicios}${servicio.id ? `/${servicio.id}` : ""}`;
    const method = servicio.id ? "PUT" : "POST";

    const { data } = await axios({
      method,
      url,
      data: servicio,
    });

    return data;
  } catch (error) {
    console.error("Error al guardar el servicio:", error);
    const errorMessage =
      error.response?.status === 400
        ? "Error: Los datos proporcionados son inválidos."
        : "Error al conectarse con el servidor.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
}

// Eliminar un servicio
export async function eliminarServicio(id) {
  try {
    const { data } = await axios.put(`${API_URL}/servicioEliminar/${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    throw new Error("No se pudo eliminar el servicio.");
  }
}
