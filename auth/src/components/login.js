import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const loginRequired = Component => props => {
  // const isLogin = useSelector(state => state.auth.isLogin)
  const isLogin = false
  const [loaded, setLoaded] = useState(false)
  const { history } = props
  useEffect(() => {
    isLogin === true
      ? setLoaded(true)
      : history.push('/login')
  }, [isLogin, history, setLoaded])
  return <Component {...props} loaded={loaded} />
}
