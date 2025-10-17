import React from "react";

import { useDoctor } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  console.log("🚀 ~ DoctorCard ~ navigate:", navigate);

  const handleBook = () => {
    navigate(`/book-appointment/${doctor.id}`);
  };
  return ( 
    <div className="doctorCard p-4 bg-blue-500 text-white rounded">
      <div key={doctor.id}>
        <p>Name:{doctor.name}</p>
        <p>specialization:{doctor.specialization}</p>
        <p>contact:{doctor.contact}</p>
        
      </div>
      <button onClick={handleBook}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
