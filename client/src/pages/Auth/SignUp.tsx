import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Auth.scss';

const SignUp = () => {
  const navigate =  useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, password
      })
    });
    const data = await res.json();

    if (data.status === "ok") {
      navigate('/login')
    }
  }

  return (
    <div className="auth-form">
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
        <div> Already have an account? </div>
        <a href="/log-in"> Log in </a>
      </form>
    </div>
  )
};

export default SignUp;
