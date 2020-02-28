import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import MailIcon from '@material-ui/icons/Mail';
import CalendarTodayIcon from  '@material-ui/icons/CalendarToday';
import Avatar from '@material-ui/core/Avatar';

import './App.css';

import Comments from './Comments';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  appbar: {
    'backgroundImage': 'linear-gradient(90deg, #2CA895, #3C73B8)'
  },
  toolbar: {
    width: '80%',
    margin: 'auto',
  },
}));

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h1: {
      fontFamily: 'Muli',
      fontSize: '1.75em',
    },
    body1: {
      fontSize: '1em',
    }
  },
  palette: {
    primary: {
      main: '#2CA895',
      contrastText: '#fff',
    },
    secondary: {
      main: '#3C73B8',
      contrastText: '#fff',
    },
    type: 'light'
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <IconButton fontSize="small" edge="start" className={classes.menuButton} color="inherit">
            <PeopleIcon />
          </IconButton>
          <IconButton className={classes.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <IconButton className={classes.menuButton} color="inherit">
            <SearchIcon />
          </IconButton>
          <span className={classes.spacer}></span>
          <IconButton className={classes.menuButton} color="inherit">
            <MailIcon />
          </IconButton>
          <IconButton className={classes.menuButton} color="inherit">
            <CalendarTodayIcon />
          </IconButton>
          <Avatar edge="end">O</Avatar>
        </Toolbar>
      </AppBar>

      <Comments />

    </MuiThemeProvider>
  );
}
