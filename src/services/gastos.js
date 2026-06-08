import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const getGastos = () =>
  axios.get(`${BASE_URL}/gastos`).then(res => res.data)

export const getCategorias = () =>
  axios.get(`${BASE_URL}/categorias`).then(res => res.data)

export const agregarGasto = (gasto) =>
  axios.post(`${BASE_URL}/gastos`, gasto).then(res => res.data)

export const eliminarGasto = (id) =>
  axios.delete(`${BASE_URL}/gastos/${id}`)