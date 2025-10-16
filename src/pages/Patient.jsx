import React, { useState } from 'react'
import { usePatient } from '../context/PatientContext'

// import { useNavigate } from 'react-router-dom';


const Patient = () => {
   const {loading, createPatient} = usePatient();
  //  const navigate = useNavigate();
   const [form , setForm] = useState({
    name: "",
    dob: "",
    contact: "",
    email: "",
    password: "", 

   });

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});

   }
const handleSubmit = async (e) => {
  e.preventDefault();

  // capture result from context
  const success = await createPatient(form);

  if (success) {
    // clear form
    setForm({
      name: "",
      dob: "",
      contact: "",
      email: "",
      password: "",
    });

    // redirect to login page
    // navigate("/login");
  }
};

  return (
    <div className='patient'>
        <h2>Patient Registration</h2>
        <div>
            <input  
             type='text'
             name='name'
             placeholder='Full name'
             value={form.name}
             onChange={handleChange}
            />
        </div>
        <div>
           <input
  type="date"
  name="dob"
  placeholder="Date of Birth"
  value={form.dob}
  onChange={handleChange}
/>
        </div>
        <div>
            <input  
             type='phone'
                  name='contact'
             placeholder='Contact number'
             value={form.contact}
                onChange={handleChange}
            />
        </div>
        <div>
            <input  
             type='email'
                  name='email'
             placeholder='Email'
             value={form.email}
                  onChange={handleChange}
            />
        </div>
        <div>
            <input  
             type='password'
                  name='password'
             placeholder='Password'
             value={form.password}
                onChange={handleChange}
            />
        </div>
            <div>
                <button 
                 type='submit'
                 disabled={loading}
                 onClick={handleSubmit}
                >Submit</button>
            </div>

    </div>
  )
}

export default Patient