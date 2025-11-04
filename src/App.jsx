import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//contexts
import { PatientProvider } from "./context/PatientContext";
import { DoctorProvider } from "./context/DoctorContext";
import { ServiceProvider } from "./context/ServiceContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { BillProvider } from "./context/BillContext";
import Patient from "./pages/Patient";
import Login from "./components/Login";
import Doctor from "./pages/Doctor";
import Service from "./pages/Service";
import Appointment from "./pages/Appointment";
import PatientProfile from "./pages/PatientProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <PatientProvider>
        <DoctorProvider>
          <ServiceProvider>
            <AppointmentProvider>
           
                <Routes>
                  <Route path="/" element={<Patient />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/doctor" element={<Doctor />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/book-appointment" element={<Appointment />} />
                  <Route path="/patient-profile" element={<PatientProfile />} />
                  
                </Routes>
  
            </AppointmentProvider>
          </ServiceProvider>
        </DoctorProvider>
      </PatientProvider>
    </BrowserRouter>
  );
};

export default App;
