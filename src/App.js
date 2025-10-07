import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const productos = [
    { id: 1, nombre: "GTA7", precio: 100000 },
    { id: 2, nombre: "Resident evil 4 remake", precio: 25000 },
    { id: 3, nombre: "Dying light", precio: 50000 },
    { id: 4, nombre: "Minecraft", precio: 20000 },
  ];

  const agregarAlCarrito = (producto) => {
    const index = carrito.findIndex((p) => p.nombre === producto.nombre);
    if (index !== -1) {
      // Ya existe, incrementa la cantidad
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
    } else {
      // No existe, agregar con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    // Mostrar mensaje de confirmación
    setMensaje(`${producto.nombre} se agregó al carrito`);
    setTimeout(() => setMensaje(""), 2000);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  // Suma precio * cantidad
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Carrito de compras</h1>

      {/* Mensaje visual */}
      {mensaje && (
        <div className="alert alert-success text-center" role="alert">
          {mensaje}
        </div>
      )}

      <h4>Productos disponibles</h4>
      <div className="row">
        {productos.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">${p.precio.toLocaleString()}</p>
                <button
                  onClick={() => agregarAlCarrito(p)}
                  className="btn btn-primary"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h4 className="mt-4">Sección del Carrito</h4>
      {carrito.length === 0 ? (
        <p className="text-muted">Tu carrito está vacío</p>
      ) : (
        <ul className="list-group mb-3">
          {carrito.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.nombre} x{item.cantidad}
              <div>
                <span className="me-3">
                  ${(item.precio * item.cantidad).toLocaleString()}
                </span>
                <button
                  onClick={() => eliminarDelCarrito(index)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="alert alert-info text-center">
        Total: <strong>${total.toLocaleString()}</strong>
      </div>
    </div>
  );
}
