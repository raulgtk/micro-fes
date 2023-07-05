import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({ isLogin, onLogout }) => {
  const home = isLogin ? '/portal/home': '/portal'
  return (
    <div className="header">
      <h1><Link to={home}>Portal UXXI</Link></h1>
      {isLogin && (
        <ul className="menu">
          <li><Link to="/ac">AC</Link></li>
          <li><Link to="/rrhh">RRHH</Link></li>
          <li>
            <Button onClick={onLogout} variant="link">
              <span className="icon-power" />
            </Button>
          </li>
        </ul>
      )}
    </div>
  )
}
export default Header