import React, {createContext, useContext, useEffect, useState} from "react";

import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import toast from "react-hot-toast";

const ServiceContext = createContext();

export const ServiceProvider = ({children}) => {

    const [services, setServices] = useState([])
    const [loading, setLoading ] = useState(false)

    const fetchService = async() => { 
        try {
            setLoading(true)
            const res = await api.get(ENDPOINTS.SERVICE.ALL)
            console.log("🚀 ~ fetchService ~ res:", res)
            setServices(res.data)
        } catch (error) {
            console.log("🚀 ~ fetchService ~ error:", error)
              toast.error("Failed to load services");
        } finally {
                setLoading(false)
        }

    }

 

    const serviceById = async() => {
        try {
            setLoading(true)
            const {data} = await api.get(ENDPOINTS.SERVICE.BY_ID(id))
            console.log("🚀 ~ serviceById ~ data:", data)
            return data;
            
        } catch (error) {
            console.log("🚀 ~ serviceById ~ error:", error)
            
        } finally {
                setLoading(false)
        }
    }


    return (
  <ServiceContext.Provider  
      value={{services, loading, serviceById, fetchService}}
   
   >{children}</ServiceContext.Provider>
    );
 

}

export const useService = () => useContext(ServiceContext);