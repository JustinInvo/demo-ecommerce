import React from 'react'
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react';
import IcTable from "../../../../assets/table.svg"
import "./TableAdmin.scss"

export function TableAdmin(props) {
  const { table } = props;
  return (
    <div className='table-admin'>
      <IcTable/>
    </div>
  )
}
