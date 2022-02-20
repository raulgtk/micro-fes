import React, { useRef, useEffect } from 'react'
import { mount } from 'rrhh/bootstrap'

const RrhhApp = ({ onSubmit }) => {
  const ref = useRef(null)
  useEffect(() => {
    mount(ref.current, { onSubmit })
  }, [])

  return (
    <div ref={ref} />
  )
}
export default RrhhApp