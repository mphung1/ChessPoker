import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const LogOut = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
      fetch('/api/auth/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
      }}).then((res) => {
      if (res.status === 200 || res.status === 204) {
        dispatch({type: 'USER', payload: false})
        alert('Log out successfully');
        navigate('/log-in');
    }});
  }, [])

  return <></>
}

export default LogOut;
