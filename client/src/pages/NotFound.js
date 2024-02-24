import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='d-flex justify-center items-center'>
       Page Not Found
       <Link className="btn btn-success" to={"/"}> GO Back</Link>
    </div>
  )
}

export default NotFound
