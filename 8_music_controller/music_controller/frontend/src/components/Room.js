import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, Typography, ButtonGroup } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

const Room = ({ leaveRoomCallback }) => {
  // let default_state = {};
  const [datas, setDatas] = useState({
    artist: 'LÜCY',
    duration: 246513,
    id: '5XEanyXMTmJwi6C3ECSc2j',
    image_url:
      'https://i.scdn.co/image/ab67616d0000b2734d7920426c0fe56827c48da5',
    is_playing: true,
    time: 132936,
    title: 'CACTUS',
    votes: 0,
    votes_required: 0,
  });
  const [state, setState] = useState({
    votes_to_skip: 0,
    guest_can_pause: false,
    is_host: true,
    showSettings: false,
    spotifyAuthenticated: false,
    song: [],
  });
  const { roomCode } = useParams();
  const navigate = useNavigate();
  // const url = '/api/get-room?code=' + roomCode;

  const getRoomDetails = async () => {
    return await fetch('/api/get-room?code=' + roomCode).then((response) => {
      if (!response.ok) {
        leaveRoomCallback();
        navigate('/');
      }
      return response.json();
    });
  };
  // 這個是因為useeffect渲染問題，如果只調用getRoomDetails則會無法執行setState這件事
  // 所以把下半部片段獨立出來，供useEffect調用。
  const getRoomDetails_part = () => {
    getRoomDetails().then((data) => {
      setState({
        ...state,
        votes_to_skip: data.votes_to_skip,
        guest_can_pause: data.guest_can_pause,
        is_host: data.is_host,
      });
      if (state.is_host) {
        authenticateSpotify();
      }
    });
  };

  useEffect(() => {
    getRoomDetails_part();
    getCurrentSong();
    const interval = setInterval(getCurrentSong, 700);
  }, []);
  // console.log('state', state); //! check the response data

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState({ ...state, spotifyAuthenticated: data.status });
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };
  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setState({ ...state, song: data });
        // console.log(new Array(data));
        setDatas({
          ...datas,
          artist: data.artist,
          duration: data.duration,
          id: data.id,
          image_url: data.image_url,
          is_playing: data.is_playing,
          time: data.time,
          title: data.title,
          votes: data.votes,
        });
      });
  };

  const leaveButtonPressed = () => {
    const requsetOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/api/leave-room', requsetOptions).then((_response) => {
      //! _response 是甚麼 @.@?
      navigate('/');
    });
  };

  const updateShowSettings = (value) => {
    setState({
      ...state,
      showSettings: value,
    });
    // console.log(state.showSettings);
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={state.votes_to_skip}
            guestCanPause={state.guest_can_pause}
            roomCode={roomCode}
            updateCallback={getRoomDetails_part}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  if (state.showSettings === true) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer state={datas} />
      {state.is_host ? renderSettingsButton() : null}

      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
