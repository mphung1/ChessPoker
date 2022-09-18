import React, {useState, useEffect} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GameCard from 'components/GameCard/GameCard';
import './Game.scss';

const Game = () => {
  const navigate = useNavigate();
  const [chips, setChips] = useState<number>(0);
  const [tempChips, setTempChips] = useState<number>();

  async function populateResource () {
    const res = await fetch('http://localhost:8080/api/user/chips', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    const data = res.json();
    // console.log(data);
    if (data.status === 'ok') {
      setChips(data.chips)
    } else {
      alert(data.err)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    // const newToken = token.substring(7, bearerString.length);
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate("/login", { replace : true})
      } else {
        populateResource()
      }
    }
  }, []);

    async function updateChips () {
      const res = await fetch('http://localhost:8080/api/user/chips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          chips: tempChips,
        }),
      })

      const data = await res.json();
      if (data.status === 'ok') {
        setChips(tempChips);
        setTempChips(0);
      } else {
        alert(data.err)
      }
    }

  return (
      <div className="mode-options">
        <h1> Your chips: {chips || 0 }</h1>
        <form onSubmit={updateChips}>
          <input type="text" placeholder="Set your chips" value={tempChips}
          onChange={(e) =>  setTempChips(e.target.value) }
          />
          <input type="submit" value="Update chips" />
        </form>
        <GameCard title="Bughouse" subtitle="Game Mode 1" description="description"
        option1="Join game" option2="Create game" link1="/Game/bughouse" link2="/Game/bughouse/createGame"/>
        <GameCard title="Choker" subtitle="Game Mode 2" description="description"
        option1="Create Game" option2="Join Game" link1="/Game/choker" link2="/Game/choker/createGame"/>
        <GameCard title="Bot" subtitle="Game Mode 3" description="Dummy bot"
        option1="Play with bot"  link1="/Game/bot" option2="Play Magnus" link2="/Game"/>

        <Outlet />
      </div>
  )
}

export default Game;
