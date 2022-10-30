import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Dialog, Box, Slide, Hidden, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Menu, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  dialog: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    width: '100vw',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  options: {
    display: 'flex',
  },

  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: '25px',
    [theme.breakpoints.down('md')]: {
      margin: '20px 0 0 20px',
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SideBar = ({ color }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" color={color}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5"><strong>JM Paletes</strong></Typography>

          {/* opções */}
          <Hidden smDown>
            <Box className={classes.options}>
              <Link className={classes.link} to='/jm-system/dashboard'>
                <Typography variant="h6">
                  Dashboard
                </Typography>
              </Link>
              <Link className={classes.link} to='/jm-system/comprovante'>
                <Typography variant="h6">
                  Compra de palete
                </Typography>
              </Link>
              <Link className={classes.link} to='/jm-system/despesas'>
                <Typography variant="h6">
                  Cadastro de despesas
                </Typography>
              </Link>
            </Box>
          </Hidden>

          {/* menu */}
          <Hidden mdUp>
            <IconButton edge='end' aria-label="menu" onClick={handleOpen}>
              <Menu  style={{ color: '#fff' }} />
            </IconButton>
          </Hidden>


          {/* Dialog */}
          <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition} keepMounted>
            <Box style={{ backgroundColor: '#3f51b5', padding: '10px 0 10px 20px' }}>
              <IconButton color='secondary' edge='start' aria-label="menu" onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <Box className={classes.dialog}>
              <Link className={classes.link} to='/jm-system/dashboard'>
                <Typography variant="h6">
                  <strong>Dashboard</strong>
                </Typography>
              </Link>
              <Link className={classes.link} to='/jm-system/comprovante'>
                <Typography variant="h6">
                  <strong>Compra de palete</strong>
                </Typography>
              </Link>
              <Link className={classes.link} to='/jm-system/despesas'>
                <Typography variant="h6">
                  <strong>Cadastro de despesas</strong>
                </Typography>
              </Link>
            </Box>
          </Dialog>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SideBar;