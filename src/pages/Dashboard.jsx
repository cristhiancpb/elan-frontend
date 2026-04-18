import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import Sidebar from '../components/Sidebar'

ChartJS.register(CategoryScale, LinearScale, BarElement)

function Dashboard() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('sesionAdmin')) navigate('/login')
    const p = JSON.parse(localStorage.getItem('productos')) || [
      { nombre: 'Ambientador', categoria: 'cuidado hogar', precio: 35000, stock: 48, stockMin: 10 },
      { nombre: 'Hipoclorito', categoria: 'cuidado hogar', precio: 52000, stock: 12, stockMin: 10 },
      { nombre: 'Suavizante', categoria: 'cuidado hogar', precio: 28000, stock: 8, stockMin: 10 },
    ]
    setProductos(p)
  }, [])

  const bajos = productos.filter(p => p.stock <= p.stockMin).length

  const ventas = [320000, 450000, 390000, 520000, 410000, 480000, 560000]
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']

  const dataGrafico = {
    labels: meses,
    datasets: [{
      data: ventas,
      backgroundColor: '#1e8a5e',
      borderRadius: 6,
    }]
  }

  const statsStyle = {
    background: '#161b22', border: '1px solid #30363d',
    borderRadius: '12px', padding: '24px', flex: 1
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar active="Inicio" />
      <div style={{ marginLeft: '200px', padding: '32px', flex: 1 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '28px' }}>
          Dashboard
        </h1>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={statsStyle}>
            <div style={{ color: '#8b949e', fontSize: '0.82rem', marginBottom: '8px' }}>Total Productos</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>{productos.length}</div>
          </div>
          <div style={statsStyle}>
            <div style={{ color: '#8b949e', fontSize: '0.82rem', marginBottom: '8px' }}>Ventas del día</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1e8a5e' }}>$450.000</div>
          </div>
          <div style={statsStyle}>
            <div style={{ color: '#8b949e', fontSize: '0.82rem', marginBottom: '8px' }}>Bajo inventario</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#f85149' }}>{bajos} productos</div>
          </div>
          <div style={statsStyle}>
            <div style={{ color: '#8b949e', fontSize: '0.82rem', marginBottom: '8px' }}>Predicción</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1e8a5e' }}>Alta demanda</div>
          </div>
        </div>

        <div style={{
          background: '#161b22', border: '1px solid #30363d',
          borderRadius: '12px', padding: '24px'
        }}>
          <div style={{ color: '#8b949e', fontSize: '0.85rem', marginBottom: '16px' }}>
            Ventas del mes
          </div>
          <Bar data={dataGrafico} options={{
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#8b949e' }, grid: { color: '#21262d' } },
              y: { ticks: { color: '#8b949e' }, grid: { color: '#21262d' } }
            }
          }} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard