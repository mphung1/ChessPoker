import { createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

export const login = async (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const { data } = await axios.post('/login', {email,password}, config);
  localStorage.setItem('userInfo', JSON.stringify(data));

  return data;
}
