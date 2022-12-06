import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import useStyles from './style';
import memories from '../../images/memories.png';
import memoriesText from '../../images/memoriesText.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch({ type: 'LOG_OUT' });
    navigate('/auth');
    setUser(null);
  }, [navigate, dispatch]);

  useEffect(() => {
    const token = user?.tokenId;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [navigate, user?.tokenId, logOut]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Typography
        component={Link}
        to='/'
        className={classes.brandContainer}
        variant='h2'
        align='center'
      >
        <img src={memoriesText} height='45px' alt='icon' />
        <img
          className={classes.image}
          src={memories}
          height='40px'
          alt='Memories'
        />
      </Typography>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt=''
              src={user?.profileObj?.imageUrl}
            >
              {user?.profileObj?.name.charAt(0)}
            </Avatar>
            <Typography variant='h6' className={classes.username}>
              {user?.profileObj?.email}
            </Typography>
            <Button variant='contained' color='secondary' onClick={logOut}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant='contained'
            component={Link}
            to='/auth'
            color='primary'
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
