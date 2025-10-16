import React, { createContext, useContext, useState } from "react";
import api from '../api/axiosInstance'
import {ENDPOINTS} from '../api/endpoints'
import toast from "react-hot-toast";


const BillContext = createContext();

export const BillProvider = ({children}) => {
   const [bills, setBills] = useState([]);
   const [loading, setLoading] = useState(false);

   const getPatientBills = async(patientId) => {
      try {
         setLoading(true)
         const {data} = await api.get(ENDPOINTS.BILLS.BY_PATIENT(patientId))
         setBills(data.bills || data)
         console.log("🚀 ~ getPatientBill ~ res:", res)
         return data
      } catch (error) {
         console.log("🚀 ~ getPatientBill ~ error:", error)
             toast.error("Failed to load bills");
      } finally {
         setLoading(false)
      }

   }

  <BillContext.Provider value={{bills, loading, getPatientBills}}>
   {children}
  </BillContext.Provider>
}

export const useBill = () => useContext(BillContext);