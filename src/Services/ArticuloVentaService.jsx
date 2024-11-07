import axios from "axios";
import { API_URL } from "../App.config";

// Función para obtener artículos con paginación y filtros de consulta
export async function obtenerArticulosVenta(consulta, page, pageSize) {
  try {
    const { data } = await axios.get(`${API_URL}/articulosPageQuery`, {
      params: {
        consulta,
        page,
        size: pageSize,
      },
    });
    return data;
  } catch (error) {
    console.error("Error buscando artículos:", error);
    throw new Error("No se pudo obtener los artículos.");
  }
}

// Función para obtener un solo artículo por ID
export async function obtenerArticuloVenta(id) {
  try {
    const { data } = await axios.get(`${API_URL}/articulos/${id}`);
    return data;
  } catch (error) {
    console.error("Error buscando el artículo:", error);
    throw new Error("No se pudo obtener el artículo.");
  }
}

// Función para crear o actualizar un artículo
export async function newArticuloVenta(model) {
  try {
    const url = `${API_URL}/articulos${model.id ? `/${model.id}` : ""}`;
    const method = model.id > 0 ? "PUT" : "POST";

    const { data } = await axios({
      method,
      url,
      data: model,
    });

    return data;
  } catch (error) {
    console.error("Error al guardar el artículo:", error);
    // Mensaje de error simplificado para el usuario
    const errorMessage =
      error.response?.status === 400
        ? "Error: Los datos proporcionados son inválidos"
        : "Error al conectarse con el servidor";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
}

// Función para eliminar un artículo
export async function eliminarArticulosVenta(id) {
  try {
    await axios.put(`${API_URL}/articulosEliminar/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar el artículo:", error);
    throw new Error("No se pudo eliminar el artículo porque tiene asociado una linea.");
  }
}
