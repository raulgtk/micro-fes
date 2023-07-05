import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => (
  <div className="section">
    <div className="box">
      MAIN APP
    </div>
    <Link to="/portal/login">
      Iniciar sesión
    </Link>
  </div>
)
export default Public