import { useState } from "react"
import { getOrdersByTableApi, checkDeliveredOrderApi, addOrderToTableApi } from "../api/orders"

export function useOrder(){
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [orders, setOrders] = useState(null)

  const getOrdersByTable = async(idTable, status, ordering) => {
    try{
      const response = await getOrdersByTableApi(idTable, status, ordering)
      setOrders(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }
  
  const checkDeliveredOrder = async(id) => {
    try{
      await checkDeliveredOrderApi(id)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const addOrderToTable = async(idTable, idProduct) => {
    try{
      await addOrderToTableApi(idTable, idProduct)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }
  
  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable
  }
}