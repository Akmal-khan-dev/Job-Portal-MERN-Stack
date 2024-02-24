import React, { useState } from 'react'
import Layout from './Layout'
import axios from 'axios'


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [location, setLocation] = useState();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/user/register', {name, email, phone, password, location})
      if(data.success){
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className='container pt-5 d-flex flex-column justify-content-between align-items-center '>
        <h2 className='lead display-4'>Register</h2>
        .<div
          class="row justify-content-center align-items-center g-2"
        >
           <div className='col-md-5'>
          <img src='../assets/images/register.jpg' className='img-fluid' />
        </div>
        <div className='col-md-5'>
          <div>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name='name' value={name} onChange={(e)=>setName(e.target.value)}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />

              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />

              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" name='location' value={location} onChange={(e)=>setLocation(e.target.value)} />

              </div>
              

              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

          </div>
        </div>
        </div>
        
       
      </div>
    </Layout>
  )
}

export default Register
