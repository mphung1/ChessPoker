import {useState} from 'react';

const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function loginUser(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();

    if (data.user) {
      alert('Login Successful')
      window.location.href = '/Game'
    } else {
      alert('Email or password is incorrect')
    }
  }

  return (
    <form onSubmit={loginUser}>
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
      <input type="submit" value="Log in" />
      <div> Don't have an account? </div>
      <a href="/SignUp"> Sign Up </a>
    </form>
  )
};

export default LogIn;
