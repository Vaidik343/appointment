import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import toast from "react-hot-toast";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState(
      JSON.parse(localStorage.getItem("patient")) || null
    );

 
const loginPatient = async (payload) => {
  setLoading(true);
  try {
 const { data } = await api.post(ENDPOINTS.PATIENTS.LOGIN, payload);
toast.success("Login successfully!");
setPatient(data.patient);
localStorage.setItem("patient", JSON.stringify(data.patient));
localStorage.setItem("token", data.token);
return true;

  } catch (error) {
    console.log("🚀 ~ loginPatient ~ error:", error)
    
  }  finally {
    setLoading(false)
  }

}


//logout

const logoutPatient = async() => {
  try {
    await api.post(ENDPOINTS.PATIENTS.LOGOUT)
    localStorage.removeItem("token");
     toast.success("Logged out successfully!");
     
  } catch (error) {
    console.log("🚀 ~ logoutPatient ~ error:", error)
    
  }
}

  // Create/Register patient
  const createPatient = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post(ENDPOINTS.PATIENTS.CREATE, payload);
      toast.success("Registered successfully!");
      return true || res.data// optional: return new patient
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("🚀 Registration error:", error);
      return false
    } finally {
      setLoading(false);
    }
  };
 
  //patient by id

  const getPatientById = async (id) => {
    try {
      const {data} = await api.get(ENDPOINTS.PATIENTS.BY_ID(id))
      setPatient(data);
      return data;
    } catch (error) {
      console.log("🚀 ~ getPatientById ~ error:", error)

    }
  }

  return (
    <PatientContext.Provider value={{ loginPatient,createPatient,logoutPatient, getPatientById, patient , loading }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
