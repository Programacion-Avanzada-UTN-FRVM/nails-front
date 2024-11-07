import axios from "axios";
import { API_URL } from "../App.config";

// Función para obtener la lista de lineas con paginación
export async function obtenerLineas(consulta, page, pageSize) {
  try {
    const { data } = await axios.get(`${API_URL}/lineasPageQuery`, {
      params: { consulta, page, size: pageSize },
    });
    return data;
  } catch (error) {
    console.error("Error buscando lineas:", error);
    throw new Error("No se pudo obtener la lista de lineas.");
  }
}

// Función para obtener todas las lineas sin paginación (por ejemplo, para un combo box)
export async function obtenerLineas2() {
  try {
    const { data } = await axios.get(`${API_URL}/lineas`);
    return data;
  } catch (error) {
    console.error("Error buscando lineas:", error);
    throw new Error("No se pudo obtener la lista de lineas.");
  }
}

// Función para obtener una linea específica por ID
export async function obtenerLinea(id) {
  try {
    const { data } = await axios.get(`${API_URL}/linea/${id}`);
    return data;
  } catch (error) {
    console.error("Error en buscar una linea:", error);
    throw new Error("No se pudo obtener la linea especificada.");
  }
}

// Función para crear o actualizar una linea
export async function newLinea(linea) {
  try {
    const url = `${API_URL}/linea${linea.id ? `/${linea.id}` : ""}`;
    const method = linea.id > 0 ? "PUT" : "POST";

    const { data } = await axios({
      method,
      url,
      data: linea,
    });

    return data;
  } catch (error) {
    console.error("Error al guardar la linea:", error);
    const errorMessage =
      error.response?.status === 400
        ? "Error: Los datos proporcionados son inválidos"
        : "Error al conectarse con el servidor";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
}

// Función para eliminar una linea por ID
export async function eliminarLineas(id) {
  try {
    await axios.put(`${API_URL}/lineaEliminar/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar la linea:", error);
    throw new Error("No se pudo eliminar la linea.");
  }
}
