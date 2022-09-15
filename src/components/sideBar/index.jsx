import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ReciboEmpresa from '../../pages/reciboVendas/Empresa';
import Recibo from '../../pages/reciboComissao';

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

const SideBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onChange={(event) => {
                    setValue(1);
                }}>
            <Typography variant="h6" className={classes.title}>
              Recibo para clientes
            </Typography>
          </Button>
          <Button edge="start" className={classes.menuButton} color="inherit" onChange={(event) => {
                    setValue(2);
                }}>
            <Typography variant="h6" className={classes.title}>
              Recibo para empresas
            </Typography>
          </Button>
          <Button edge="start" className={classes.menuButton} color="inherit" onChange={(event) => {
                    setValue(3);
                }}>
            <Typography variant="h6" className={classes.title}>
              Recibo de comissão
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>

      { value === 1 && (
        <h1>alo</h1>
      )}

      { value === 2 && (
        <ReciboEmpresa />
      )}

      { value === 1 && (
        <Recibo />
      )}

    </>
  );
}

export default SideBar;