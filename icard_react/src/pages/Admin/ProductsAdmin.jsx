import React, { useState, useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableProductAdmin, AddEditProductForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useProduct } from "../../hooks"

export function ProductsAdmin() {
  const [ showModal, setShowModal] = useState(null)
  const [ titleModal, setTitleModal] = useState(null)
  const [ contentModal, setcontentModal] = useState(null)
  const [ refetch, setRefetch] = useState(false)
  const { loading, products, getProducts, deleteProduct } = useProduct()


  const openCloseModal = () => setShowModal(prev => !prev);
  const openRefetch = () => setRefetch(prev => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo producto")
    setcontentModal(<AddEditProductForm onclose={openCloseModal} openRefetch={openRefetch}/>)
    openCloseModal();
  }

  const updateProduct = (data) => {
    setTitleModal("Actualizar producto")
    setcontentModal(<AddEditProductForm onclose={openCloseModal} openRefetch={openRefetch} product={data}/>)
    openCloseModal();
  }
  
  const onDeleteProduct = async (data) => {
    const result = window.confirm(`¿Eliminar producto ${data.title}`)
    if(result){
      await deleteProduct(data.id)
      openRefetch()
    }
  }

  useEffect(()=> {
    getProducts()
  }, [refetch])

  return (
    <>
      <HeaderPage title="Productos" btnTitle="Nuevo producto" btnClick={addProduct}/>
      {loading ? (
        <Loader active inline="centered">Cargando ...</Loader>
      ) : (
        <TableProductAdmin products={products} updateProduct={updateProduct} deleteProduct={onDeleteProduct}/>
      )}
      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal}/>
    </>
  )
}
