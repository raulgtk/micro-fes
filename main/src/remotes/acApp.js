import React, { useRef, useEffect } from 'react'
import { mount } from 'ac/bootstrap'

const AcApp = ({ onSubmit }) => {
  const ref = useRef(null)
  useEffect(() => {
    mount(ref.current, { onSubmit })
  }, [])

  return (
    <div ref={ref} />
  )
}
export default AcApp