import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import toast from "react-hot-toast";

const AppointmentContext = createContext();

  export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const createAppointment = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post(ENDPOINTS.APPOINTMENTS.CREATE, payload);
      toast.success("Appointment book successfully");
      setAppointments((prev) => [...prev, data]);
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
      console.log("🚀 ~ createAppointment ~ error:", error);
    } finally {
      setLoading(false);
    } 
  };


  const getAppointmentByPatientId = async(id) => {
    try {
      setLoading(true)
      const res = await api.get(ENDPOINTS.APPOINTMENTS.BY_PATIENT_ID(id));
        toast.success("Your Appointments");
        setAppointments(res.data)

    } catch (error) {
      console.log("🚀 ~ getAppointmentByPatientId ~ error:", error)
        toast.error(
         error.response?.data?.message || "Failed to get appointments"
     );

    } finally {
      setLoading(false);
    }
  }
  const cancelAppointment = async (id) => {
    try {
        setLoading(true);
      const {data} = await api.patch(ENDPOINTS.APPOINTMENTS.CANCEL(id));

      setAppointments((prev) => prev.filter((appt) => appt.id !== id))
      toast.success("Appointment cancelled successfully");
      return data;
    } catch (error) {
      console.log("🚀 ~ cancelAppointment ~ error:", error);
       toast.error("Failed to cancel appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{   appointments,
        loading, getAppointmentByPatientId,createAppointment, cancelAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
