import React from 'react'

const ServiceCard = ({services}) => {


  return (
    <div className='serviceCard'>

        <div key={services.id}>

            <p>{services.name}</p>
            <p>{services.cost}</p>
        </div>
    </div>
  )
}

export default ServiceCard 