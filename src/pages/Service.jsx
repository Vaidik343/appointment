import React, { useEffect } from 'react'
import { useService } from '../context/ServiceContext'
import ServiceCard from '../components/ServiceCard';

const Service = () => {
   const {services, loading, fetchService} = useService();

   useEffect( ()=> {
    fetchService();
   }, []);

 if (loading)
    return (
      <p className="text-center mt-10 text-blue-500">Loading Services...</p>
    );

  return (
    <div className='service'>
      {services && services.length > 0 ? (
        services.map( (ser) => (
            <ServiceCard key={ser.id}  services={ser}/>
        ))
      ): (
        <span>No services..</span>
      )}

    </div>
  )
}

export default Service