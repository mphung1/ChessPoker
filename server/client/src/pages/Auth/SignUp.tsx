import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Hero from 'components/Hero/Hero';
import background from './bg4.jpg';
import './Auth.scss';

const SignUp = () => {
  const navigate =  useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
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
      navigate('/log-in')
    }
  }

  return (
    <div>
      <Hero background={background}>
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
            <div style={{marginTop: '1rem'}}> Already have an account? </div>
            <a href="/log-in"> Log in </a>
          </form>
        </div>
      </Hero>
    </div>
  )
};

export default SignUp;
