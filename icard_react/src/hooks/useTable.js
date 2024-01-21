import { useState } from "react";
import { getTablesApi, addTableApi, updateTableApi, deleteTableApi } from "../api/table";
import { useAuth } from "./"

export function useTable(){
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const [ tables, setTables ] = useState(true)
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

  return {
    loading,
    error,
    tables,
    getTables,
    addTable,
    updateTable,
    deleteTable
  }
}