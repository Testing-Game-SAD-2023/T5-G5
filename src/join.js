//import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
/*
function JoinGamePage() {
  const { playerName } = useParams();
  const [joiningGame, setJoiningGame] = useState(false);

  const handleJoinGame = async () => {
    setJoiningGame(true);
    try {
        const playerName1 = 'A';
        await axios.post('http://localhost:8080/join-game?playerName='+playerName1, {
          params: {
            playerName: playerName
          }
        });
        console.log('Joined game successfully');
      } catch (error) {
        console.error('Failed to join game', error);
      }
      
      setJoiningGame(false);}

  return (
    <div>
      <h1>Join game</h1>
      <p>Player name: {playerName}</p>
      <button onClick={handleJoinGame} disabled={joiningGame}>
        {joiningGame ? 'Joining game...' : 'Join game'}
      </button>
    </div>
  );
}

export default JoinGamePage;
*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function MyComponent() {
  const [onpage, setOnpage] = useState(null);
  const invitationId =  localStorage.getItem('inviteId');

  console.log('Valore di inviteId nel LocalStorage:', invitationId);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
    fetch(`http://localhost:8080/invitations/invitations/${invitationId}/onpagebyid`)
      .then(response => response.json())
      .then(data => {
        
          setOnpage(data.onpage);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, );
 

    return () => clearInterval(interval);
  }, [onpage]);
  useEffect(() => {
    if (onpage === true) {
      navigate('/about');
    }
  }, [onpage, navigate]);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
    
      {onpage === true ? (
        <div style={{
          fontSize: '2em',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          color: 'green'
        }}>Ingresso in lobby</div>
      ) : (
        <div style={{
          fontSize: '2em',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          color: 'red'
        }}>Il player non è nella partita</div>
      )}
    </div>
  );
}

export default MyComponent;