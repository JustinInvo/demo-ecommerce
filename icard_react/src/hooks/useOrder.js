import { useState } from "react"
import { getOrdersByTableApi, checkDeliveredOrderApi, addOrderToTableApi, addPaymentToOrderApi, closeOrderApi, getOrdersByPaymentApi } from "../api/orders"

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
  
  const addPaymentToOrder = async(idOrder, idPayment) => {
    try{
      await addPaymentToOrderApi(idOrder, idPayment)
    }catch(error){
      setError(error)
    }
  }

  const closeOrder = async(idOrder) => {
    try{
      await closeOrderApi(idOrder)
    }catch(error){
      setError(error)
    }
  }

  const getOrdersByPayment = async(idPayment) => {
    try{
      return await getOrdersByPaymentApi(idPayment)
    }catch(error){
      setError(error)
    }
  }


  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable,
    addPaymentToOrder,
    closeOrder,
    getOrdersByPayment
  }
}