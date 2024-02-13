import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { useParams } from "react-router-dom"
import { HeaderPage, AddOrderForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { ListOrderAdmin } from "../../components/Admin/TableDetails"
import { useOrder, useTable } from '../../hooks'

export function TableDetailsAdmin() {
  const [ reloadOrders, setReloadOrders ] = useState(false)
  const { loading, orders, getOrdersByTable } = useOrder()
  const { table, getTable } = useTable()
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

  const onReloadOrders = () => setReloadOrders((prev) => !prev)
  const openCloseModal = () => setShowModal((prev) => !prev)

  return (
    <>
      <HeaderPage title={`Mesa ${table?.number || ""}`} 
        btnTitle="Añadir pedido"
        btnClick={openCloseModal}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando ...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>
      )}
      <ModalBasic show={showModal} onClose={openCloseModal} title="Generar pedidos">
        <AddOrderForm idTable={id} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders}/>
      </ModalBasic>
    </>
  )
}


// export function TableDetailsAdmin() {
//   const [ reloadOrders, setReloadOrders ] = useState(false)
//   const { loading, orders, getOrdersByTable } = useOrder()
//   const { table, getTable } = useTable()
//   const { id } = useParams()
  
//   useEffect(()=>{
//     getOrdersByTable(id, "","ordering=-status,created_at")  
//   }, [id, reloadOrders])

//   useEffect(()=> getTable(id), [id])

//   const onReloadOrders = () => setReloadOrders((prev) => !prev)

//   return (
//     <div>
//       <HeaderPage title={`Mesa ${table?.number || ""}`}/>
//       {loading ? (
//         <Loader active inline="centered">
//           Cargando ...
//         </Loader>
//       ) : (
//         <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders}/>
//       )}
//     </div>
//   )
// }
