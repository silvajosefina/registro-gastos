import { useState, useEffect } from 'react'
import { getGastos, getCategorias, agregarGasto, editarGasto, eliminarGasto } from './services/gastos'
import GastoForm from './components/GastoForm'
import GastoList from './components/GastoList'
import Resumen from './components/Resumen'
import './App.css'

const App = () => {
  const [gastos, setGastos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [filtro, setFiltro] = useState('')
  const [orden, setOrden] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getGastos(), getCategorias()])
      .then(([dataGastos, dataCategorias]) => {
        setGastos(dataGastos)
        setCategorias(dataCategorias)
        setCargando(false)
      })
      .catch(() => {
        setError('No se pudo conectar con el servidor. Verificá que json-server esté corriendo.')
        setCargando(false)
      })
  }, [])

  const handleAgregar = (nuevoGasto) => {
    agregarGasto(nuevoGasto)
      .then(data => setGastos(gastos.concat(data)))
      .catch(() => setError('Error al agregar el gasto.'))
  }

  const handleEliminar = (id) => {
    eliminarGasto(id)
      .then(() => setGastos(gastos.filter(g => g.id !== id)))
      .catch(() => setError('Error al eliminar el gasto.'))
  }

  const handleEditar = (id, gastoActualizado) => {
    editarGasto(id, gastoActualizado)
      .then(data => setGastos(gastos.map(g => g.id === id ? data : g)))
      .catch(() => setError('Error al editar el gasto.'))
  }

  const categoriaFiltrada = categorias.find(c => c.id === filtro)

  let gastosFiltrados = filtro
    ? gastos.filter(g => g.categoriaId === filtro)
    : gastos

  if (orden === 'fecha') {
    gastosFiltrados = [...gastosFiltrados].sort((a, b) => a.fecha.localeCompare(b.fecha))
  } else if (orden === 'monto') {
    gastosFiltrados = [...gastosFiltrados].sort((a, b) => b.monto - a.monto)
  }

  if (cargando) return <p className="mensaje-carga">Cargando datos...</p>

  return (
    <div className="app-container">
      <h1>Registro de Gastos</h1>

      {error && <p className="mensaje-error">{error}</p>}

      <GastoForm categorias={categorias} onAgregar={handleAgregar} />

      <div className="controles">
        <label>Filtrar por categoría: </label>
        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="">Todas</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <label>Ordenar por: </label>
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="">Sin orden</option>
          <option value="fecha">Fecha</option>
          <option value="monto">Monto (mayor a menor)</option>
        </select>
      </div>

      <Resumen
        gastos={gastosFiltrados}
        filtro={categoriaFiltrada ? categoriaFiltrada.nombre : null}
      />

      <GastoList
        gastos={gastosFiltrados}
        categorias={categorias}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
      />
    </div>
  )
}

export default App