import React, { useState } from 'react'
import { usePatient } from '../context/PatientContext'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const {loginPatient ,patient , loading } = usePatient();
      const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password:'',

    })

     const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});

   }
const handleSubmit = async (e) => {
  e.preventDefault();



  // capture result from context
  const success = await loginPatient(form);

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
    navigate("/doctor");
  }
};

  return (
    <div className='login'>
        <h2>Login register</h2>
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
            placeholder='password'
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

     <span><Link path='/'>Dont have account?</Link></span>
    </div>
  )
}

export default Login