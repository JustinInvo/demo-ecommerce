import { useState } from "react";
import { size } from "lodash"
import { getTablesApi, addTableApi, updateTableApi, deleteTableApi, getTableApi, getTableByNumberApi } from "../api/table";
import { useAuth } from "./"

export function useTable(){
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const [ tables, setTables ] = useState(true)
  const [ table, setTable ] = useState(true)
  const { auth } = useAuth()

  const getTables = async () => {
    try{
      setLoading(true)
      const response = await getTablesApi(auth.token)
      setTables(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const addTable = async (data) => {
    try{
      setLoading(true)
      await addTableApi(data, auth.token)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const updateTable = async (id, data) => {
    try{
      setLoading(true)
      await updateTableApi(id, data, auth.token)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const deleteTable = async (id) => {
    try{
      setLoading(true)
      await deleteTableApi(id, auth.token)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const getTable = async (id) => {
    try{
      setLoading(true)
      const response = await getTableApi(id)
      setTable(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const isExistTable = async (tableNumber) => {
    try{
      setLoading(true)
      const response = await getTableByNumberApi(tableNumber)
      if(size(response) > 0) return true
      throw Error()
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  const getTableByNumber = async (tableNumber) => {
    try{
      const response = await getTableByNumberApi(tableNumber)
      return response
    }catch(error){
      setError(error)
    }
  }

  return {
    loading,
    error,
    tables,
    table,
    getTables,
    addTable,
    updateTable,
    deleteTable,
    getTable,
    isExistTable,
    getTableByNumber
  }
}