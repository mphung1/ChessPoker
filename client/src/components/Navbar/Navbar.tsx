import React from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.scss';
import { Button } from '../Button/Button';

class Navbar extends React.Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
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
          onClick={this.handleClick}
        >
          <i
            className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}
          ></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
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
    );
  }
}

export default Navbar;
