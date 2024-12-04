import PropTypes from "prop-types";

export function FormularioCliente({
  cliente = {
    celular: "",
    email: "",
    razonSocial: "",
  },
  onSubmit,
  title,
}) {
  const { celular, email, razonSocial } = cliente;

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes / {title} </h1>
        <hr></hr>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="razonSocial" className="form-label">
            Apellido Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="razonSocial"
            name="razonSocial"
            required={true}
            defaultValue={razonSocial}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="celular" className="form-label">
            Celular
          </label>
          <input
            type="number"
            className="form-control"
            id="celular"
            name="celular"
            required={true}
            defaultValue={celular}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            defaultValue={email}
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/clienteList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

FormularioCliente.propTypes = {
  cliente: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
