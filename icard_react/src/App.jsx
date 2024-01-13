import React from 'react'
import { Navigation } from "./routes"
import {ClientLayout} from "./layouts"

export default function App() {
  return (
    <div className='app'>
      {/* <h1 className='app_title'>Holaaa</h1> */}
      <Navigation/>
    </div>
  )
}