import React, { useState, useEffect, useContext } from 'react';
import  {useNavigate} from 'react-router-dom';
import { HomepageItems, GameItems } from './MenuItems';
import { Button } from '../Button/Button';
import { UserContext } from '../../App';
import { FaCoins } from "react-icons/fa";
import './Navbar.scss';
const Modal = require('react-modal');

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Navbar() {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userChips, setUserChips] = useState<number>(0)
  const [tempChips, setTempChips] = useState<number|string>(0);
  const [clicked, setClicked] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function updateChips(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('/api/user/chips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        chips: tempChips,
      }),
    });

    const data = await res.json();
    if (data.status === 'ok') {
      setTempChips(0);
    } else {
      alert(data.err);
    }
  }

  useEffect(() => {
    async function getUserChips() {
      const res = await fetch('/api/user/info', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setUserChips(data.chips)
      } else {
        alert(data.err);
      }
    }
    getUserChips();
  });

    const handleClick = () => {
      setClicked(!clicked)
    };

    const RenderMenu = () => {
      if (state) {
        return (
          <>
            <a className='user-resource' onClick={openModal}>
              <div className='user-chips' style={{ display: 'flex', flexDirection: 'row', marginLeft: '1rem', color: 'white', gap: '0.25rem'}}>
                <span> {userChips} </span>
                <FaCoins  />
              </div>
            </a>
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

            <Modal
             isOpen={modalIsOpen}
             onRequestClose={closeModal}
             style={customModalStyles}
             contentLabel="Example Modal"
           >
             <div>
               <h2> Update your chips: </h2>
                 <form onSubmit={updateChips}>
                   <input
                     type="text"
                     placeholder="Set your chips"
                     value={tempChips}
                     onChange={(e) => setTempChips(e.target.value)}
                     style={{ marginLeft: '1rem' }}
                   />
                   <input
                     type="submit"
                     value="Confirm"
                   />
                 </form>
             </div>
          </Modal>
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
