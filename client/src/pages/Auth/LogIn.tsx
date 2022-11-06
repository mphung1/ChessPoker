import React, { useState } from 'react';
// import  {useNavigate} from 'react-router-dom';
import { useAuth } from 'hooks/AuthContext';

const LogIn = (props: any) => {
  // const { isUserLoggedIn, userAuth } = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { setAuth } = useAuth();

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

      alert('Log in successfully');
      // setAuth(true);
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
        <a href="/sign-up"> Sign Up </a>
      </form>
    </div>
  );
};

export default LogIn;
