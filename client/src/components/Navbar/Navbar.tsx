import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.scss';
import { Button } from '../Button/Button';

function Navbar(props: any) {
  const {isUserLoggedIn, userAuth} = props
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  };

    return (
    <>
      { isUserLoggedIn ? (
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
          <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
            {MenuItems.map((item, index) => {
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
            className=""
          >
            <Button onClick={() => userAuth()}>Log Out</Button>
          </a>
        </nav>
        ) : (
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
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
              {MenuItems.map((item, index) => {
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
          </nav>
        )
        }
      </>
    );
}

export default Navbar;
