import React, { useState, useEffect } from 'react'
import { Form, Image, Button, Dropdown } from 'semantic-ui-react'
import { map } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useProduct, useOrder } from '../../../../hooks';
import "./AddOrderForm.scss"

export function AddOrderForm(props) {
  const { idTable, openCloseModal, onReloadOrders } = props;
  const { products, getProducts, getProductsById } = useProduct()
  const [ productsFormat, setProductsFormat ] = useState([])
  const [ productsData, setProductsData ] = useState([])
  const { addOrderToTable } = useOrder()

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };

    fetchData();
  }, []);

  useEffect(() => setProductsFormat(formatDropdownData(products)), [products])
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validationOnChange: false,
    onSubmit: async(formValue) => {
      for await (const idProduct of formValue.products){
        await addOrderToTable(idTable, idProduct)
      }
      onReloadOrders()
      openCloseModal()
    }
  })
  
  useEffect(() => {
    const fetchData = async () => {
      await addProductList();
    };

    fetchData();
  }, [formik.values]);

  const addProductList = async() => {
    try{
      const productsId = formik.values.products;
      const arrayTemp = []
      for await (const idProduct of productsId){
        console.log(idProduct)
        const response = await getProductsById(idProduct)
        arrayTemp.push(response)
      }
      setProductsData(arrayTemp)
    }catch(error){

    }
  }

  const removeProductList = (index) => {
    const idProducts = [...formik.values.products]
    idProducts.splice(index, 1)
    formik.setFieldValue("products", idProducts)
  }

  return (
    <Form className='add-order-form' onSubmit={formik.handleSubmit}>
      <Dropdown placeholder='Productos' fluid selection 
        search
        options={productsFormat} 
        value={null}
        onChange={(_, data) => formik.setFieldValue("products", [...formik.values.products, data.value])}
        />
      <div className='add-order-form__list'>
        {map(productsData, (product, index) => (
          <div className='add-order-form__list-product' key={index}>
            <div>
              <Image src={product.image} avatar size="tiny"/>
              <span>{product.title}</span>
            </div>
            <Button type='button' basic color='red' onClick={() => removeProductList()}>Eliminar</Button>
          </div>
        ))}
      </div>
      <Button type='submit' content="Añadir productos a la mesa" fluid primary/>
    </Form>
  )
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id
  }))
}

function initialValues() {
  return {
    products: [],
  }
}

function validationSchema() {
  return{
    products: Yup.array().required(true)
  }
}
