import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { useParams } from "react-router-dom"
import { HeaderPage, AddOrderForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { ListOrderAdmin, PaymentDetail } from "../../components/Admin/TableDetails"
import { useOrder, useTable, usePayment } from '../../hooks'
import { forEach, size } from 'lodash'

export function TableDetailsAdmin() {
  const [ paymentData, setPaymentData ] = useState(null)
  const [ reloadOrders, setReloadOrders ] = useState(false)
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder()
  const { table, getTable } = useTable()
  const { createPayment, getPaymentByTable } = usePayment()
  const { id } = useParams()

  const [ showModal, setShowModal ] = useState(false)
  // const [ showModal, setShowModal ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await getOrdersByTable(id, "","ordering=-status,created_at");
    };

    fetchData();
  }, [id, reloadOrders]);

  useEffect(() => {
    const fetchTable = async () => {
      await getTable(id);
    };

    fetchTable();
  }, [id]);

  useEffect(() => {
    const fetchTable = async () => {
      const response = await getPaymentByTable(id);
      if(size(response) > 0) setPaymentData(response[0])
    };

    fetchTable();
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev)
  const openCloseModal = () => setShowModal((prev) => !prev)

  const onCreatePayment = async() => {
    const result = confirm('¿Estas seguro de generar la cuenta?')
    if(result){
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment+=Number(order.product_data.price)
      })
      const resultTypePayment = confirm('¿Quieres pago con tarjeta(Aceptar) o efectivo(cancelar)?')

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? 'CARD': 'CASH',
        statusPayment: "PENDING"
      }
      const payment = await createPayment(paymentData)
      for await (const order of orders){
        await addPaymentToOrder(order.id, payment.id)
      }
      onReloadOrders()
    }
  }

  return (
    <>
      <HeaderPage title={`Mesa ${table?.number || ""}`} 
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar cuenta": null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando ...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>
      )}
      <ModalBasic show={showModal} onClose={openCloseModal} title="Generar pedidos">
        {paymentData ? (
          <PaymentDetail payment={paymentData} orders={orders} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders}/>
        ): (
          <AddOrderForm idTable={id} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders}/>
        )}
      </ModalBasic>
    </>
  )
}