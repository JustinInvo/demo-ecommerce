import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { map } from "lodash"
import routes from "./routes"
import {Error404} from "../pages"
import {BasicLayout} from "../layouts"

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {map(routes, (route, index)=> (
          <Route
          key={index}
          path={route.path}
          exact={route.exact}
          element={
            <route.layout>
              <route.component/>
            </route.layout>
          }
          />
          ))}
          <Route path="*" element={<Error404 />} /> 
          {/* Esta línea manejará las rutas no encontradas */}
      </Routes>
    </BrowserRouter>
  )
}