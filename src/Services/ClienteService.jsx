import axios from "axios";
import { API_URL } from "../App.config";

// Función para obtener la lista de clientes con paginación
export async function obtenerClientes(consulta, page, pageSize) {
  try {
    const { data } = await axios.get(`${API_URL}/clientesPageQuery`, {
      params: { consulta, page, size: pageSize },
    });
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw new Error("No se pudo obtener la lista de clientes.");
  }
}

// Función para obtener clientes sin paginación (para llenar un combo box)
export async function obtenerClientesForCombo() {
  try {
    const { data } = await axios.get(`${API_URL}/clientes`);
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw new Error("No se pudo obtener la lista de clientes para el combo.");
  }
}

// Función para obtener un cliente específico por ID
export async function obtenerCliente(id) {
  try {
    const { data } = await axios.get(`${API_URL}/cliente/${id}`);
    return data;
  } catch (error) {
    console.error("Error en buscar un cliente:", error);
    throw new Error("No se pudo obtener el cliente.");
  }
}

// Función para crear o actualizar un cliente
export async function newCliente(cliente) {
  try {
    const url = `${API_URL}/cliente${cliente.id ? `/${cliente.id}` : ""}`;
    const method = cliente.id > 0 ? "PUT" : "POST";

    const { data } = await axios({
      method,
      url,
      data: cliente,
    });

    return data;
  } catch (error) {
    console.error("Error al guardar el cliente:", error);
    const errorMessage =
      error.response?.status === 400
        ? "Error: Los datos proporcionados son inválidos"
        : "Error al conectarse con el servidor";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
}

// Función para eliminar un cliente
export async function eliminarCliente(id) {
  try {
    await axios.put(`${API_URL}/clienteEliminar/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw new Error("No se pudo eliminar el cliente.");
  }
}
