import React, { useState } from 'react';
import { userDetails } from './Constant';
import { useNavigate } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userDetails.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      navigate('/home');
    } else {
      alert('Wrong credentials')
    }
    // Reset the form
    setUsername('');
    setPassword('');
  };

  return (
    <Card style={{ width: '18rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', top: '30vh', left: '80vh' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Text htmlFor="username">Username:</Form.Text>
            <Form.Control
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text htmlFor="password">Password:</Form.Text>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group style={{margin:'auto'}}>
            <Button variant='primary' type="submit">Login</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;
