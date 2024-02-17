import React, {useState, useEffect} from 'react'
import { size } from 'lodash';
import { Link } from 'react-router-dom';
import { getOrdersByTableApi } from "../../../../api/orders"
import { ORDER_STATUS } from '../../../../utils/constans';
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react';
import { usePayment } from "../../../../hooks"
// import IcTable from "../../../../assets/table.svg"
import "./TableAdmin.scss"

export function TableAdmin(props) {
  const { table, reload } = props;
  const [ orders, setOrders ] = useState([])
  const [ tableBusy, setTableBusy ] = useState([])
  const [ pendingPayment, setPendingPayment ] = useState(false)
  const { getPaymentByTable } = usePayment()

  useEffect(()=> {
    (async()=>{
      const response = await getOrdersByTableApi(
        table.id, ORDER_STATUS.PENDING
      );
      setOrders(response)
    })();
  }, [reload])

  useEffect(()=> {
    (async()=>{
      const response = await getOrdersByTableApi(
        table.id, ORDER_STATUS.DELIVERED
      );
      if(size(response)> 0 ) setTableBusy(response)
      else setTableBusy(false)
    })();
  }, [reload])

  useEffect(()=> {
    (async()=>{
      const response = await getPaymentByTable(table.id);
      if(size(response) > 0) setPendingPayment(true)
      else setPendingPayment(false)
    })();
  }, [reload])

  return (
    <Link className='table-admin' to={`/admin/table/${table.id}`}>
      {size(orders)>0 ?(
        <Label circular color='orange'>
          {size(orders)}
        </Label>
      ) : null}

      {pendingPayment && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )}

      <svg className={size(orders) > 0 ? 'pending': tableBusy ? 'busy' : pendingPayment ? 'pending-payment' : null}
        version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="225.000000pt" height="225.000000pt" viewBox="0 0 225.000000 225.000000"
        preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
        <path d="M51 1809 c-24 -5 -45 -10 -46 -11 -1 -2 6 -57 16 -123 54 -347 97
        -770 106 -1047 l6 -198 65 0 65 0 -6 195 -6 195 209 0 210 0 0 -195 0 -195 60
        0 60 0 0 285 c0 231 -3 291 -15 314 -26 50 -57 56 -313 56 -225 0 -233 1 -237
        20 -2 11 -9 70 -15 130 -13 123 -53 417 -70 518 -13 73 -11 72 -89 56z"/>
        <path d="M2111 1754 c-18 -102 -58 -395 -71 -519 -6 -60 -13 -119 -15 -130 -4
        -19 -12 -20 -237 -20 -256 0 -287 -6 -313 -56 -12 -23 -15 -83 -15 -314 l0
        -285 60 0 60 0 0 195 0 195 210 0 209 0 -6 -195 -6 -195 65 0 65 0 6 197 c7
        207 33 514 66 768 23 175 49 351 56 382 5 23 4 23 -86 39 l-37 6 -11 -68z"/>
        <path d="M530 1480 l0 -130 265 0 265 0 0 -395 0 -395 -65 0 -65 0 0 -65 0
        -65 195 0 195 0 0 65 0 65 -65 0 -65 0 0 395 0 395 265 0 265 0 0 130 0 130
        -595 0 -595 0 0 -130z"/>
        </g>
      </svg>
      <p>Mesa {table.number}</p>
    </Link>
  )
}
