import React, { useRef, useEffect } from 'react'
import { mount } from 'auth/bootstrap'

const AuthApp = ({ onSubmit }) => {
  const ref = useRef(null)
  useEffect(() => {
    mount(ref.current, { onSubmit })
  }, [])

  return (
    <div ref={ref} />
  )
}
export default AuthApp