import React, {createContext, useContext, useEffect, useState} from "react";
import { ENDPOINTS } from "../api/endpoints";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const DoctorContext = createContext();

export  const DoctorProvider = ({children}) => {
    const [doctor, setDoctor] = useState([])
    const [loading , setLoading] = useState(false)
 
    const fetchDoctor = async () => {
        try {
             setLoading(true)
            const res = await api.get(ENDPOINTS.DOCTOR.ALL)
            console.log("🚀 ~ fetchDoctor ~ res:", res)
            setDoctor( res.data );
            return res;
        } catch (error) {
            console.log("🚀 ~ fetchDoctor ~ error:", error)
                  toast.error("Failed to load doctors");
        } finally {
            setLoading(false)
        }

    }

    const doctorById = async (id) => {
        try {
            setLoading(true)
                const {data} = await api.get(ENDPOINTS.DOCTOR.BY_ID(id))
          return data
        } catch (error) { 
            console.log("🚀 ~ doctorById ~ error:", error)
            
        }finally {
      setLoading(false);
    }
    }
return (
     <DoctorContext.Provider  value={{doctor, loading, fetchDoctor, doctorById}}>{children}</DoctorContext.Provider>

);
   
}

export const useDoctor = () => useContext(DoctorContext);