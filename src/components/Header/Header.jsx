import React, {useContext} from 'react';
import {Context} from '../../App'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({open}) {
  const context = useContext(Context);
  const classes = useStyles();
  const AuthActions = () => {
    return <>
            <Link to="/login">
              <Button style={{color: 'white'}} >Login</Button>
            </Link>
            <Link to='/register'>
              <Button style={{color: 'white'}} >Register</Button>
            </Link>
          </>
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() =>open(true)}>
            <MenuIcon style={{ color: "white"}}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Reservation
          </Typography>
        {context.state.auth.user ? <Avatar name={context.state.auth.user.name}/> : <AuthActions />}
        </Toolbar>
      </AppBar>
    </div>
  );
}