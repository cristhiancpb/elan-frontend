import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Productos() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [modal, setModal] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [form, setForm] = useState({ nombre: '', categoria: 'cuidado hogar', precio: '', stock: '' })

  useEffect(() => {
    if (!localStorage.getItem('sesionAdmin')) navigate('/login')
    const p = JSON.parse(localStorage.getItem('productos')) || [
      { nombre: 'Ambientador', categoria: 'cuidado hogar', precio: 35000, stock: 48, stockMin: 10 },
      { nombre: 'Hipoclorito', categoria: 'cuidado hogar', precio: 52000, stock: 12, stockMin: 10 },
      { nombre: 'Suavizante', categoria: 'cuidado hogar', precio: 28000, stock: 8, stockMin: 10 },
    ]
    setProductos(p)
  }, [])

  function guardar() {
    if (!form.nombre || !form.precio || !form.stock) { alert('Completa todos los campos'); return }
    const nuevo = { ...form, precio: parseInt(form.precio), stock: parseInt(form.stock), stockMin: 10 }
    let lista = [...productos]
    if (editIndex >= 0) { lista[editIndex] = nuevo } else { lista.push(nuevo) }
    setProductos(lista)
    localStorage.setItem('productos', JSON.stringify(lista))
    setModal(false)
    setForm({ nombre: '', categoria: 'cuidado hogar', precio: '', stock: '' })
    setEditIndex(-1)
  }

  function editar(i) {
    setForm(productos[i])
    setEditIndex(i)
    setModal(true)
  }

  function eliminar(i) {
    if (!confirm('¿Eliminar este producto?')) return
    const lista = productos.filter((_, idx) => idx !== i)
    setProductos(lista)
    localStorage.setItem('productos', JSON.stringify(lista))
  }

  const inputStyle = {
    width: '100%', background: '#0d1117', border: '1px solid #30363d',
    color: '#e6edf3', borderRadius: '8px', padding: '10px 14px',
    fontSize: '0.9rem', outline: 'none', marginTop: '6px'
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar active="Productos" />
      <div style={{ marginLeft: '200px', padding: '32px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Gestión de Productos</h1>
          <button onClick={() => { setModal(true); setEditIndex(-1); setForm({ nombre: '', categoria: 'cuidado hogar', precio: '', stock: '' }) }}
            style={{ background: '#1e8a5e', border: 'none', color: '#fff', borderRadius: '8px', padding: '9px 20px', fontWeight: '600', cursor: 'pointer' }}>
            + Agregar producto
          </button>
        </div>

        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#21262d' }}>
              <tr>
                {['Nombre', 'Categoría', 'Precio', 'Stock', 'Acciones'].map(h => (
                  <th key={h} style={{ color: '#8b949e', fontSize: '0.82rem', padding: '12px 20px', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #21262d' }}>
                  <td style={{ padding: '14px 20px' }}>{p.nombre}</td>
                  <td style={{ padding: '14px 20px', color: '#8b949e' }}>{p.categoria}</td>
                  <td style={{ padding: '14px 20px' }}>${p.precio.toLocaleString('es-CO')}</td>
                  <td style={{ padding: '14px 20px' }}>{p.stock}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <button onClick={() => editar(i)} style={{ background: 'rgba(30,138,94,0.15)', color: '#1e8a5e', border: '1px solid #1e8a5e', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', marginRight: '8px' }}>✏️ Editar</button>
                    <button onClick={() => eliminar(i)} style={{ background: 'rgba(248,81,73,0.1)', color: '#f85149', border: '1px solid #f85149', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer' }}>🗑️ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '440px' }}>
            <h5 style={{ marginBottom: '24px', fontWeight: '700' }}>{editIndex >= 0 ? 'Editar' : 'Agregar'} Producto</h5>
            {['nombre', 'precio', 'stock'].map(field => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{ color: '#c9d1d9', fontSize: '0.88rem' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input type={field === 'nombre' ? 'text' : 'number'} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={inputStyle} />
              </div>
            ))}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#c9d1d9', fontSize: '0.88rem' }}>Categoría</label>
              <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} style={inputStyle}>
                <option>cuidado hogar</option>
                <option>cuidado personal</option>
                <option>cuidado facial</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid #30363d', color: '#8b949e', borderRadius: '8px', padding: '10px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={guardar} style={{ flex: 1, background: '#1e8a5e', border: 'none', color: '#fff', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer' }}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Productos