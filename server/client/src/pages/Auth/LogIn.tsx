import React, { useState, useContext } from 'react';
import  { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/AuthContext';
import { UserContext } from '../../App';
import Hero from 'components/Hero/Hero';
import background from './bg4.jpg';

const LogIn = (props: any) => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    if (data.user) {
      dispatch({type: 'USER', payload: true})
      localStorage.setItem('token', data.user);
      alert('Log in successfully');
      navigate('/dashboard');
    } else { // res.status === 400 || !data.user
      alert('Your email or password is incorrect');
    }
  }

  return (
    <div>
      <Hero background={background}>
        <div className="auth-form">
          <form onSubmit={loginUser}>
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
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
            <input
              type="submit"
              value="Log in"
            />
            <div style={{marginTop: '1rem'}}> Don't have an account? </div>
            <a href="/sign-up"> Sign Up </a>
          </form>
        </div>
      </Hero>
    </div>
  );
};

export default LogIn;
