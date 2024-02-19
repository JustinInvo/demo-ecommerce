import React from 'react'
import { Image } from 'semantic-ui-react'
import moment from 'moment'
import "moment/locale/es"
import { ORDER_STATUS } from '../../../utils/constans'
import "./OrderHistoryItem.scss"

export function OrderHistoryItem(props) {
  const { order } = props;
  const { title, image } = order.product_data

  return (
    <div className={'order-history-item '+ order.status.toLowerCase()}>
      <div className='order-history-item__time'>
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>
      <div className='order-history-item__product'>
        <Image src={image}/>
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  )
}
