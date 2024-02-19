import React, { useState, useEffect } from 'react'
import { size } from "lodash"
import { Link, useParams } from 'react-router-dom'
import { useProduct } from "../../hooks"
import { getProductsCart } from '../../api/cart'
import { Button } from 'semantic-ui-react'
import { ListProductCart } from '../../components/Client'

export function Cart() {
  const [products , setProducts] = useState(null)
  const [reloadCart , setReloadCart] = useState(false)
  const { getProductsById } = useProduct()
  const { tableNumber } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const idProductsCart = await getProductsCart()
      const productsArray = [];
      for await (const idProduct of idProductsCart){
        const response = await getProductsById(idProduct)
        productsArray.push(response)
      }
      console.log("products-->", productsArray)
      setProducts(productsArray)
    };
    fetchData();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev)

  return (
    <div>
      {!products ? (
        <p>Cargando</p>
      ) : (
        size(products) < 1 ? (
          <div style={{textAlign: "center"}}>
            <p>No tienes productos en el carrito</p>
            <Link to={`/client/${tableNumber}/orders`}>
              <Button primary>Ver pedidos</Button>
            </Link>
          </div>
        ) : (
          <ListProductCart products={products} onReloadCart={onReloadCart}/>
        )
      )}
    </div>
  )
}