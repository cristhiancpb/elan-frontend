import api from './api'

// ===========================
// MOCK — datos de prueba
// Cuando el backend esté listo, eliminar el mock
// y descomentar las funciones reales de abajo
// ===========================

const PRODUCTOS_MOCK = [
  { id: 1, nombre: 'Ambientador',    categoria: 'cuidado hogar',     precio: 35000, stock: 48, stockMin: 10 },
  { id: 2, nombre: 'Hipoclorito',    categoria: 'cuidado hogar',     precio: 52000, stock: 12, stockMin: 10 },
  { id: 3, nombre: 'Suavizante',     categoria: 'cuidado hogar',     precio: 28000, stock: 8,  stockMin: 10 },
  { id: 4, nombre: 'Gel antibacterial', categoria: 'cuidado personal', precio: 45000, stock: 20, stockMin: 10 },
  { id: 5, nombre: 'Limpiavidrios',  categoria: 'cuidado hogar',     precio: 32000, stock: 35, stockMin: 10 },
]

// Simula la base de datos en memoria mientras no hay backend
let productosDB = [...PRODUCTOS_MOCK]

export const getProductos = async () => {
  // MOCK
  return productosDB

  // REAL — descomentar cuando el backend esté listo
  // const res = await api.get('/productos')
  // return res.data
}

export const crearProducto = async (producto) => {
  // MOCK
  const nuevo = { ...producto, id: Date.now() }
  productosDB.push(nuevo)
  return nuevo

  // REAL — descomentar cuando el backend esté listo
  // const res = await api.post('/productos', producto)
  // return res.data
}

export const editarProducto = async (id, producto) => {
  // MOCK
  productosDB = productosDB.map(p => p.id === id ? { ...p, ...producto } : p)
  return productosDB.find(p => p.id === id)

  // REAL — descomentar cuando el backend esté listo
  // const res = await api.put(`/productos/${id}`, producto)
  // return res.data
}

export const eliminarProducto = async (id) => {
  // MOCK
  productosDB = productosDB.filter(p => p.id !== id)
  return { ok: true }

  // REAL — descomentar cuando el backend esté listo
  // await api.delete(`/productos/${id}`)
  // return { ok: true }
}