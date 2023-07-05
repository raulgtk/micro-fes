import React, { useState, useEffect } from 'react'
import { getCache } from '../helpers/cache'

export const authRequired = Component => props => {
  const isLogin = !!getCache('user')
  const [loaded, setLoaded] = useState(false)
  const { history } = props
  useEffect(() => {
    isLogin === true
      ? setLoaded(true)
      : history.push('/portal/login')
  }, [isLogin, history, setLoaded])
  return <Component {...props} loaded={loaded} />
}
