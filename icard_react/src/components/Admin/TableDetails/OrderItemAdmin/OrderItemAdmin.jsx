import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import "./OrderItemAdmin.scss"
import moment from "moment"
import { useOrder } from '../../../../hooks';
import { ORDER_STATUS } from '../../../../utils/constans';
import "moment/locale/es"

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props
  const { title, image } = order.product_data;
  const { checkDeliveredOrder } = useOrder()

  const onCheckDeliveredOrder = async ()=> {
    await checkDeliveredOrder(order.id)
    onReloadOrders()
  }
  return (
    // className={`order-item-admin ${order.status.toLowerCase()}}`
    <div className={`order-item-admin ${order.status.toLowerCase()}`}>
      <div className='order-item-admin__time'>
        <span>{moment(order.created_at).format("HH:mm")} </span> 
        - 
        <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
      </div>
      <div className='order-item-admin__product'>
        <Image src={image}/>
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING && (
        <Button primary onClick={()=> onCheckDeliveredOrder(order.id)}>
          Marcar entregado
        </Button>
      )}
    </div>
  )
}
