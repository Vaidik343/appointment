import React from 'react'
import { useNavigate } from 'react-router-dom'



const ServiceCard = ({services}) => {
const navigate = useNavigate();

const handleBook = () => {
  navigate(`/book-appointment/${services.id}`);
};



  return (
    <div className='serviceCard'>

        <div key={services.id}>

            <p>{services.name}</p>
            <p>{services.cost}</p>
        </div>
          <button onClick={handleBook}>Book Appointment</button>
    </div>
  )
}

export default ServiceCard 