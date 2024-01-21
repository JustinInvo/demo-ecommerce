import { useState } from "react";
import { getProductsApi, addProductApi, updateProductApi, deleteProductApi } from "../api/product"
import { useAuth } from "./"

export function useProduct(){
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState(true)
  const { auth } = useAuth()

  const getProducts = async () => {
    try{
      setLoading(true)
      const response = await getProductsApi()
      setProducts(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const addProduct = async (data) => {
    try{
      setLoading(true)
      await addProductApi(data, auth.token)
      setProducts(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const updateProduct = async (id, data) => {
    try{
      setLoading(true)
      await updateProductApi(id, data, auth.token)
      setProducts(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    try{
      setLoading(true)
      await deleteProductApi(id, auth.token)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    products,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
  }
}