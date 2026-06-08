import { useState, useEffect } from 'react'
import { getGastos, getCategorias, agregarGasto, eliminarGasto } from './services/gastos'
import GastoForm from './components/GastoForm'
import GastoList from './components/GastoList'
import Resumen from './components/Resumen'

const App = () => {
  const [gastos, setGastos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    getGastos().then(data => setGastos(data))
    getCategorias().then(data => setCategorias(data))
  }, [])

  const handleAgregar = (nuevoGasto) => {
    agregarGasto(nuevoGasto).then(data => {
      setGastos(gastos.concat(data))
    })
  }

  const handleEliminar = (id) => {
    eliminarGasto(id).then(() => {
      setGastos(gastos.filter(g => g.id !== id))
    })
  }

  const gastosFiltrados = filtro
    ? gastos.filter(g => g.categoria === filtro)
    : gastos

  return (
    <div>
      <h1>Registro de Gastos</h1>

      <GastoForm categorias={categorias} onAgregar={handleAgregar} />

      <div>
        <label>Filtrar por categoría: </label>
        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="">Todas</option>
          {categorias.map(c => (
            <option key={c.id} value={c.nombre}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <Resumen gastos={gastosFiltrados} />
      <GastoList gastos={gastosFiltrados} onEliminar={handleEliminar} />
    </div>
  )
}

export default App