import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import lscache from 'lscache'
import './index.css'

const App = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const username = data.get('username')
    const password = data.get('password')
    lscache.set('foobar', 'Hello World!', 2)
    onSubmit({
      username: username,
      password: password
    })
  }
  return (
    <Container className="section">
      <Row className="justify-content-md-center">
        <Col sm="8" className="login align-self-center">
          <h2>Inicio de sesión</h2>
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Usuario</Form.Label>
              <Form.Control name="username" type="email" required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name="password" type="password" required />
            </Form.Group>
            <div className="actions">
              <Button type="submit">
                Iniciar de sesión
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
export default App
