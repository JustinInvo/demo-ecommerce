import React from 'react'
import { useAuth } from "../../hooks"

export function HomeAdmin() {
  const {logout} = useAuth();
  return (
    <>
    <div>HomeAdmin</div>
    <button onClick={logout}>Cerrar sesión</button>
    </>
  )
}
