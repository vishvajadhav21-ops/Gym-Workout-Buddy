import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';


const Login = () => {
const [email , setEmail] = useState('');
const [password , setPassword] = useState('');
const {login , isLoading , error} =useLogin();

const handleSubmit = async(e) =>{
    e.preventDefault();

    // console.log( email , password)

   await login(email , password)
}   

  return (
    <form className='login' onSubmit={handleSubmit}>
       <h4>Login</h4>
        
        <label>Email : </label>
        <input type="email" placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password :</label>
        <input type="password" 
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled ={isLoading}>Login</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
