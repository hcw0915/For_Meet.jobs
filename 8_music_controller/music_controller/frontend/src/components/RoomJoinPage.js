import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [state, setState] = useState({ roomCode: '', error: '' });
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    console.log(state);
    console.log(e.target.value);
    setState({ ...state, roomCode: e.target.value });
  };

  const roomButtonPressed = () => {
    // console.log(state);
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: state.roomCode,
      }),
    };
    fetch('/api/join-room', requestOption)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${state.roomCode}`); //! 用useNavigate 取代 history.push
        } else {
          setState({ ...state, error: 'Room not found' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={state.error}
            label="Code"
            placeholder="Enter a Room Code"
            value={state.roomCode}
            helperText={state.error}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
