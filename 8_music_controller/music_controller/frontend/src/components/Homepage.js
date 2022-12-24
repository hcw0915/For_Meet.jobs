import React, { useEffect, useState } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

export default function Homepage() {
  const [state, setState] = useState({ roomCode: null });
  // let data;

  const getData = async () => {
    return await fetch('/api/user-in-room').then((response) => response.json());
  };

  useEffect(() => {
    getData().then((data) => {
      setState({
        ...state,
        roomCode: data.code,
      });
    });
  }, []);
  // console.log('state', state); //! check the response data

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup variant="contain" color="primary" disableElevation>
            <Button
              variant="contained"
              color="primary"
              to="/join"
              component={Link}
            >
              Join a Room
            </Button>
            <Button
              variant="contained" //! 原版沒有 要自己加
              color="secondary"
              to="/create"
              component={Link}
            >
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  const clearRoomCode = () => {
    setState({ roomCode: null });
  };

  return (
    <Router>
      <Routes>
        //! 修正render內容
        <Route
          path="/"
          element={<div>{renderHomePage()}</div>}
          render={() => {
            return state.roomCode ? (
              <Redirect to={`/room/${state.roomCode}`} />
            ) : (
              renderHomePage()
            );
          }}
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          // Route v6
          element={<Room leaveRoomCallback={clearRoomCode} />}
        />
        {/* // Route v4 */}
        {/* render={(props) => { return <Room {...props} leaveRoomCallback=clearRoomCode}  } */}
        {/* https://ui.dev/react-router-pass-props-to-components */}
      </Routes>
    </Router>
  );
}
