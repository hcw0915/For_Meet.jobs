import React from 'react';
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
//! new version import use @mui/

const MusicPlayer = ({ state }) => {
  console.log(state);
  const songProgress = (state.time / state.duration) * 100;

  const pauseSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('/spotify/pause', requestOptions);
  };
  const playSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('/spotify/play', requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('/spotify/skip', requestOptions);
  };
  console.log(state.votes);
  return (
    <div>
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={state.image_url} height="100%" width="100%" />
          </Grid>

          <Grid item align="center" xs={8}>
            <Typography variant="h5" component="h5">
              {state.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {state.artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  state.is_playing ? pauseSong() : playSong();
                }}
              >
                {state.is_playing ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon></PlayArrowIcon>
                )}
              </IconButton>
              <IconButton
                onClick={() => {
                  skipSong();
                }}
              >
                <SkipNextIcon />
                <div>
                  {state.votes} / {state.votes_required}
                </div>
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    </div>
  );
};
export default MusicPlayer;
