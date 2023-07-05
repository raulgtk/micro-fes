import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom'
import './index.css'

import { authRequired } from 'core/hoc/auth'
import { setCache } from 'core/helpers/cache'
import { getCache } from 'core/helpers/cache'
import { flushCache } from 'core/helpers/cache'

import Home from './containers/home'
import Public from './containers/public'
import Header from './components/header'
import Loading from './components/loading'

const AuthLazy = lazy(() => import('./remotes/authApp'))
const history = createBrowserHistory()

const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  const user = getCache('user')
  const onSubmit = user => {
    setCache('user', user)
    setIsLogin(true)
    history.push('/portal/home')
  }
  const onLogout = () => {
    flushCache()
    setIsLogin(false)
    history.push('/portal')
  }
  useEffect(() => {
    setIsLogin(!!user)
  }, [])

  return (
    <Router history={history}>
      <Header isLogin={isLogin} onLogout={onLogout} />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/portal/login">
            <AuthLazy onSubmit={onSubmit} />
          </Route>
          <Route path="/portal/home" component={authRequired(Home)} />
          <Route path="/portal" component={Public} />
          <Route path="/"><Redirect to="/portal" /></Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
ReactDOM.render(<App />, document.getElementById("main"))
