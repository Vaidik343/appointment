import React, { useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";
import DoctorCard from "../components/DoctorCard";



const Doctor = () => {
  const { doctor, loading, fetchDoctor } = useDoctor();

  useEffect(() => {
    fetchDoctor();
  }, []);
 

  if (loading)
    return (
      <p className="text-center mt-10 text-blue-500">Loading doctors...</p>
    );


    
  return (
    <div className="doctor">
      {doctor && doctor.length > 0 ? (
        doctor.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
      ) : (
        <p className="text-center text-gray-500 mt-6">No doctors found...</p>
      )}
    </div>
  );
};

export default Doctor;
