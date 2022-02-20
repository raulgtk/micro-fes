import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const mount = (target, { onSubmit }) => {
  ReactDOM.render(<App onSubmit={onSubmit} />, target)
}
if (process.env.NODE_ENV === 'development') {
  const app = document.querySelector('#app')
  if (app) {
    mount(app, {})
  }
}
export { mount }