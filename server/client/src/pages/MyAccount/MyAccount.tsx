import React, { useState, useEffect } from 'react';


const MyAccount = () => {
  const [chips, setChips] = useState<number|string>(0);
  const [tempChips, setTempChips] = useState<number|string>(0);

  async function populateResource() {
    const res = await fetch('http://localhost:8080/api/user/chips', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setChips(data.chips);
    } else {
      alert(data.err);
    }
  }

  async function updateChips(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/user/chips', {
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
      setChips(tempChips);
      setTempChips(0);
    } else {
      alert(data.err);
    }
  }
  return (
    <div>
      <h1> Your chips: {chips}</h1>
      <form onSubmit={updateChips}>
        <input
          type="text"
          placeholder="Set your chips"
          value={tempChips}
          onChange={(e) => setTempChips(e.target.value)}
        />
        <input
          type="submit"
          value="Update chips"
        />
      </form>
    </div>
  )
}

export default MyAccount;