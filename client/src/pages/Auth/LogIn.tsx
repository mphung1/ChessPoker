import React, { useState } from 'react';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/auth/login', {
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
      localStorage.setItem('token', data.user);
      alert('Login Successful');
      window.location.href = '/dashboard';
    } else {
      alert('Your email or password is incorrect');
    }
  }

  return (
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
        <div> Don't have an account? </div>
        <a href="/SignUp"> Sign Up </a>
      </form>
    </div>
  );
};

export default LogIn;
