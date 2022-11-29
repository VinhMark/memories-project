import {
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useState } from 'react';
import Input from './Input';
import useStyles from './style';

function Auth() {
  const classes = useStyles();
  const isSignUp = true;
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Signup' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  type='text'
                  name='lastName'
                  label='Last name'
                  handleChange={() => {}}
                  haft
                />
                <Input
                  type='text'
                  name='firstName'
                  label='First name'
                  handleChange={() => {}}
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
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
