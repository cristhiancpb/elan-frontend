import api from './api'

// ===========================
// MOCK — datos de prueba
// Cuando el backend esté listo, eliminar el mock
// y descomentar las funciones reales de abajo
// ===========================

const USUARIO_MOCK = {
  usuario: 'admin',
  contrasena: '1234',
  token: 'mock-token-123'
}

export const login = async (usuario, contrasena) => {
  // MOCK
  if (usuario === USUARIO_MOCK.usuario && contrasena === USUARIO_MOCK.contrasena) {
    localStorage.setItem('token', USUARIO_MOCK.token)
    return { ok: true }
  }
  return { ok: false, mensaje: 'Usuario o contraseña incorrectos.' }

  // REAL — descomentar cuando el backend esté listo
  // const res = await api.post('/login', { usuario, contrasena })
  // localStorage.setItem('token', res.data.token)
  // return { ok: true }
}

export const logout = () => {
  localStorage.removeItem('token')

  // REAL — descomentar cuando el backend esté listo
  // await api.post('/logout')
}

export const estaAutenticado = () => {
  return !!localStorage.getItem('token')
}