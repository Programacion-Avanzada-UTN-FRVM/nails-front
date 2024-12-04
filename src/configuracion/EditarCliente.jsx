import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FormularioCliente } from "./FormularioCliente.jsx";
import { clienteService } from "../services/ClienteService.jsx";

export function EditarCliente() {
  const [cliente, setCliente] = useState({
    celular: "",
    email: "",
    razonSocial: "",
  });
  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    clienteService.obtenerCliente(id).then(setCliente);
  }, [id]);

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const clienteActualizado = Object.assign(
      cliente,
      Object.fromEntries(formData),
    );

    await clienteService.actualizarCliente(clienteActualizado);
    navegacion("/clienteList");
  }

  return (
    <FormularioCliente title={"Editar"} cliente={cliente} onSubmit={onSubmit} />
  );
}
