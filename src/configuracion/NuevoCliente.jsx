import { useNavigate } from "react-router-dom";

import { FormularioCliente } from "./FormularioCliente.jsx";
import { clienteService } from "../services/ClienteService.jsx";

export default function NuevoCliente() {
  const navegacion = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoCliente = Object.fromEntries(formData);

    await clienteService.cargarCliente(nuevoCliente);
    navegacion("/clienteList");
  }

  return (
    <FormularioCliente
      onSubmit={onSubmit}
      title={"Nuevo"}
      cliente={{
        razonSocial: "Prueba",
        celular: "123456789",
        email: "prueba@gmail.com",
      }}
    />
  );
}
