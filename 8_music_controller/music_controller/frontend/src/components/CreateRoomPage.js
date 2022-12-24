import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import {
  Typography,
  Grid,
  Button,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Collapse,
} from '@material-ui/core';

const CreateRoomPage = ({
  votesToSkip,
  guestCanPause,
  update,
  roomCode,
  updateCallback,
}) => {
  // const defaultVotes = 2;
  // const [votes_to_skip, setVotes_to_skip] = useState(defaultVotes);
  // const [guest_can_pause, setGuest_can_pause] = useState(true);
  const [state, setState] = useState({
    votes_to_skip: votesToSkip || 2,
    guest_can_pause: guestCanPause,
    update: update,
    roomCode: roomCode,
    updateCallback: updateCallback,
    successMsg: '',
    errorMsg: '',
  });
  const navigate = useNavigate(); // useHistory 被v6換成useNavigate

  const handleVotesChange = (e) => {
    // setVotes_to_skip(e.target.value);
    setState({ ...state, votes_to_skip: e.target.value });
  };
  const handleGuestCanPauseChange = (e) => {
    // setGuest_can_pause(e.target.value);
    setState({ ...state, guest_can_pause: e.target.value });
  };

  const handleRoomButtonPressed = async () => {
    // const state = {
    //   votes_to_skip: votes_to_skip,
    //   guest_can_pause: guest_can_pause,
    // };
    const requsetOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        votes_to_skip: state.votes_to_skip,
        guest_can_pause: state.guest_can_pause,
      }),
    };

    await fetch('/api/create-room', requsetOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code));
    //! 用console不會回傳任何值 所以擺他下面的基本上無效
    // .then((data) => console.log(data.code))
  };

  const handleUpdateButtonPressed = () => {
    const requsetOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        votes_to_skip: state.votes_to_skip,
        guest_can_pause: state.guest_can_pause,
        code: state.roomCode,
      }),
    };

    console.log('外面', state);
    fetch('/api/update-room', requsetOptions).then((response) => {
      if (response.ok) {
        setState({ ...state, successMsg: 'Room updated successfully!' });
      } else {
        setState({ ...state, errorMsg: 'Error updated room...' });
      }
      state.updateCallback();
    });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  const title = state.update ? 'Update Room' : 'Create a Room';

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse in={state.errorMsg != '' || state.successMsg != ''}>
            {state.successMsg}
            {/* {state.successMsg != '' ? (
              <Alert
                severity="success"
                onClose={() => {
                  setState({ ...state, successMsg: '' });
                }}
              >
                {state.successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  setState({ ...state, successMsg: '' });
                }}
              >
                {state.errorMsg}
              </Alert>
            )} */}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={guestCanPause?.toString() || ''}
              // ?.toString() || ''
              // https://bobbyhadz.com/blog/javascript-cannot-read-property-tostring-of-undefined
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true" //標籤選定與否
                control={<Radio color="primary" />} // 標籤顏色
                label="Play/Pause" // 標籤名字
                labelPlacement="bottom" // 標籤位置
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true} // 也可以用required 不一定要加ture
              type="number"
              onChange={handleVotesChange}
              defaultValue={state.votes_to_skip} //預設值
              inputProps={{
                min: 1,
                style: {
                  textAlign: 'center',
                },
              }} //設定input欄位最小值
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {state.update ? renderUpdateButtons() : renderCreateButtons()}
      </Grid>
    </div>
  );
};

// CreateRoomPage.defaultProps = {};  //! 關於defaultProps的版本使用問題
// https://reactjs.org/docs/react-without-es6.html#declaring-default-props
export default CreateRoomPage;
