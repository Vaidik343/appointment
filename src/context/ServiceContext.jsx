import React, {createContext, useContext, useEffect, useState} from "react";

import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import toast from "react-hot-toast";

const ServiceContext = createContext();

export const ServiceProvider = ({children}) => {

    const [services, setServices] = useState([])
    const [generalServices, setGeneralServices] = useState([])
    const [doctorServices, setDoctorServices] = useState([])
    const [loading, setLoading ] = useState(false)

    const fetchService = async() => {
        try {
            setLoading(true)
            const generalRes = await api.get(ENDPOINTS.GENERAL_SERVICES.ALL);
            const general = generalRes.data.services || generalRes.data;
            const generalWithType = general.map(s => ({ ...s, type: 'general', category: s.category || 'General' }));

            // Fetch doctor services by getting all doctors and their services
            const doctorsRes = await api.get(ENDPOINTS.DOCTOR.ALL);
            const doctorServicesPromises = doctorsRes.data.map(doctor =>
                api.get(`${ENDPOINTS.DOCTOR_SERVICES.ALL}/${doctor.id}`)
            );
            const doctorServicesResponses = await Promise.all(doctorServicesPromises);
            const doctorWithType = doctorServicesResponses.flatMap((res, index) =>
                res.data.map(service => ({ ...service, type: 'doctor', doctorName: doctorsRes.data[index].name, doctor_id: doctorsRes.data[index].id }))
            );

            setGeneralServices(generalWithType);
            setDoctorServices(doctorWithType);
            setServices([...generalWithType, ...doctorWithType]);

            console.log("🚀 ~ fetchService ~ general:", generalWithType);
            console.log("🚀 ~ fetchService ~ doctor:", doctorWithType);
        } catch (error) {
            console.log("🚀 ~ fetchService ~ error:", error)
              toast.error("Failed to load services");
        } finally {
                setLoading(false)
        }

    }

    useEffect(() => {
        fetchService();
    }, []);

    const serviceById = async(id) => {
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
      value={{
          services,
          generalServices,
          doctorServices,
          loading,
          serviceById,
          fetchService
      }}

   >{children}</ServiceContext.Provider>
    );


}

export const useService = () => useContext(ServiceContext);
