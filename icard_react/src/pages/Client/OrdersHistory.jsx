import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useOrder, useTable, usePayment } from "../../hooks"
import { useParams } from 'react-router-dom'
import { OrderHistoryItem } from '../../components/Client'
import { ModalConfirm } from "../../components/Common"
import { map, size, forEach } from 'lodash'

export function OrdersHistory() {
  const [ showTypePayment, setShowTypePayment ] = useState(false)
  const [ isResquestAccount, setIsResquestAccount ] = useState(false)
  const [ idTable, setIdTable ] = useState(null)
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { getTableByNumber } = useTable()
  const { tableNumber } = useParams()
  const { createPayment, getPaymentByTable } = usePayment()

  useEffect(()=>{
    const fetchData = async () => {
      if(idTable){
        const response = await getPaymentByTable(idTable)
        setIsResquestAccount(response)
      }
    };
    fetchData();
  }, [idTable])

  useEffect(()=>{
    const fetchData = async () => {
      const table = await getTableByNumber(tableNumber)
      const idTableTemp = table[0].id
      setIdTable(idTableTemp)
      getOrdersByTable(idTableTemp, "" ,"ordering=-status,-created_at")
    };
    fetchData();
  }, [])

  const onCreatePayment = async(paymentType) => {
    setShowTypePayment(false)
    let totalPayment = 0
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price)
    })
    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING"
    }
    
    const payment = await createPayment(paymentData)
    for await(const order of orders){
      await addPaymentToOrder(order.id, payment.id)
    }
    window.location.reload()
  }

  return (
    <div>
      <h3>Historial de pedidos</h3>
      {loading ? (
        <p>Cargando...</p>
      ): (
        <>
          {size(orders)> 0 &&(
            <Button primary fluid onClick={()=> size(isResquestAccount) === 0 && setShowTypePayment(true)}>
              {size(isResquestAccount)> 0 ? 'La cuenta ya esta pedida': 'Pedir la cuenta'}
            </Button>
          )}
          {map(orders, (order)=>(
            <OrderHistoryItem key={order.id} order={order}/>
          ))}
        </>
      )}
      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={()=> onCreatePayment("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={()=> onCreatePayment("CARD")}
      />
    </div>
  )
}
