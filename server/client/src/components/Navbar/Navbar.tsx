import React, { useState, useContext } from 'react';
import  {useNavigate} from 'react-router-dom';
import { HomepageItems, GameItems } from './MenuItems';
import './Navbar.scss';
import { Button } from '../Button/Button';
import { UserContext } from '../../App';

function Navbar() {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  };

  // async function logoutUser(e: React.ChangeEvent<any>) {
  //   e.preventDefault();
  //   const res = await fetch('http://localhost:8080/api/auth/logout', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //   }});
  //
  //   if (res.status === 200) {
  //     dispatch({type: 'USER', payload: false})
  //     alert('Log out successfully');
  //     window.location.href = '/log-in';
  //   } else {
  //     // const error = new Error(res.error);
  //     // throw error
  //   }
  // }

    const RenderMenu = () => {
      if (state) {
        return (
          <>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
              {GameItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className={item.cName}
                      href={item.url}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href='log-out'
              className="sign-up-button"
            >
              <Button>Log Out</Button>
            </a>
          </>
        )
      } else {
        return (
          <>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
              {HomepageItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className={item.cName}
                      href={item.url}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="sign-up"
              className="sign-up-button"
            >
              <Button>Sign Up</Button>
            </a>
          </>
        )
      }
    }

    return (
    <>
        <nav className="NavbarItems">
          <h1 className="navbar-logo">
            <a
              href="."
              style={{ textDecoration: 'none', color: 'red' }}
            >
              ChessDeck
            </a>
          </h1>
          <div
            className="menu-icon"
            onClick={handleClick}
          >
            <i
              className={clicked ? 'fas fa-times' : 'fas fa-bars'}
            ></i>
          </div>
          <RenderMenu />
        </nav>
      </>
    );
}

export default Navbar;
