import axios from "axios";

import { API_URL } from "../App.config";
import { axiosClient } from "../axiosClient.js";

async function obtenerTodosLosClientes(consulta, page, pageSize) {
  try {
    const { data } = await axiosClient.get(
      `/clientes?consulta=${consulta}&page=${page}&size=${pageSize}`,
    );

    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

async function obtenerClientesForCombo() {
  const urlBase = API_URL + "/clientes";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

async function obtenerCliente(id) {
  try {
    const { data } = await axiosClient.get(`/clientes/${id}`);
    return data;
  } catch (error) {
    console.error("Error en buscar un cliente:", error);
    throw error;
  }
}

async function cargarCliente(cliente) {
  try {
    const { data } = await axiosClient.post(`/clientes`, cliente);
    return data;
  } catch (error) {
    console.error("Error en cargar un cliente:", error);
    throw error;
  }
}

async function actualizarCliente(cliente) {
  try {
    const { data } = await axiosClient.put(`/clientes/${cliente.id}`, cliente);
    return data;
  } catch (error) {
    console.error("Error al actualizar un cliente:", error);
    throw error;
  }
}

async function eliminarCliente(id) {
  try {
    await axiosClient.delete(`/clientes/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar un cliente:", error);
    return false;
  }
}

export const clienteService = {
  obtenerTodosLosClientes,
  obtenerClientesForCombo,
  obtenerCliente,
  cargarCliente,
  actualizarCliente,
  eliminarCliente,
};
