const Resumen = ({ gastos, filtro }) => {
  const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0)
  const maximo = gastos.length > 0 ? Math.max(...gastos.map(g => Number(g.monto))) : 0

  return (
    <div className="resumen">
      <h2>Resumen</h2>
      {filtro
        ? <p>Total en <strong>{filtro}</strong>: <span className="monto">${total}</span></p>
        : <p>Total gastado: <span className="monto">${total}</span></p>
      }
      <p>Gasto más alto: <span className="monto">${maximo}</span></p>
    </div>
  )
}

export default Resumen