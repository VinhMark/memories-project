import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memories from '../../images/memories.png';
import { Link } from 'react-router-dom';
import useStyles from './style';

const Navbar = () => {
  const classes = useStyles();
  const user = null;
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          height={60}
          alt='Memories'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt='' src='' />
            <Typography variant='h6' className={classes.username}>
              Username
            </Typography>
            <Button variant='contained'>Logout</Button>
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
