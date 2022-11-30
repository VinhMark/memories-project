import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useState } from 'react';
import Input from './Input';
import Icon from './icon';

import { GoogleLogin } from 'react-google-login';

import useStyles from './style';

function Auth() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const googleSuccess = () => {
    console.log('Google Sign In was unsuccessful. Try again');
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setShowPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Signup' : 'Sign in'}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={1}
            className={`${classes.form} ${classes.root}`}
          >
            {isSignUp && (
              <>
                <Input
                  type='text'
                  name='lastName'
                  label='Last name'
                  handleChange={() => {}}
                  haft
                  autoFocus
                />
                <Input
                  type='text'
                  name='firstName'
                  label='First name'
                  handleChange={() => {}}
                  haft
                />
              </>
            )}
            <Input
              name='email'
              type='email'
              label='Email'
              handleChange={() => {}}
            />
            <Input
              name='password'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              handleShowPassword={() => setShowPassword(!showPassword)}
              handleChange={() => {}}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={() => {}}
              />
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignUp ? 'Signup' : 'Sign in'}
            </Button>
            <GoogleLogin
              clientId='83373192730-6eom84nivja63u9qp3hrcpep69a3jjkn.apps.googleusercontent.com'
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='secondary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Google sign in
                </Button>
              )}
            />
            <Grid justifyContent='flex-end' container>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Signup"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
