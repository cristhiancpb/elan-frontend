import api from './api'

// ===========================
// MOCK — datos de prueba
// Cuando el backend esté listo, eliminar el mock
// y descomentar las funciones reales de abajo
// ===========================

let ventasDB = []

export const getVentas = async () => {
  // MOCK
  return ventasDB

  // REAL — descomentar cuando el backend esté listo
  // const res = await api.get('/ventas')
  // return res.data
}

export const registrarVenta = async (items) => {
  // MOCK
  const venta = {
    id: Date.now(),
    items,
    total: items.reduce((a, it) => a + it.precio * it.cantidad, 0),
    fecha: new Date().toLocaleDateString('es-CO'),
  }
  ventasDB.push(venta)
  return { ok: true, venta }

  // REAL — descomentar cuando el backend esté listo
  // const res = await api.post('/ventas', { items })
  // return { ok: true, venta: res.data }
}