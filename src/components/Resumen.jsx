const Resumen = ({ gastos }) => {
  const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0)
  const maximo = gastos.length > 0 ? Math.max(...gastos.map(g => Number(g.monto))) : 0

  return (
    <div>
      <p>Total gastado: ${total}</p>
      <p>Gasto más alto: ${maximo}</p>
    </div>
  )
}

export default Resumen