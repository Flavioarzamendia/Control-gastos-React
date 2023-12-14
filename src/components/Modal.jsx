import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarModal from "../img/cerrar.svg";

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId]=useState("");

  useEffect (() => {

    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha)
    }

  }, []);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son Obligatorio");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }

    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar" onClick={ocultarModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label id="nombre">Nombre Gasto</label>
          <input
            type="text"
            placeholder="Añade el Nombre del Gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label id="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Añade la cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label id="categoria">Categoria</label>

          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="educacion">Educacion</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
            
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
