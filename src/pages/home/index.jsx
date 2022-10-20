import React from 'react';
import styles from './styles';
import { Box, Button, Card, CardActions, CardContent, AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <>
            <Box className={styles().image}>
            </Box>
            <AppBar>
                <Toolbar>
                    JM Paletes
                </Toolbar>
            </AppBar>
            <Grid className={styles().root} container direction="row" justifyContent="center">

                <Grid className={styles().grid} item xs={12} sm={12} md={6} lg={4}>
                    <Card className={styles().rooters}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Comissão
                            </Typography>
                            <Typography className={styles().pos} color="textSecondary">
                                Destinado a funcionários da empresa
                            </Typography>
                            <Typography variant="body2" component="p">
                                Requer assinatura de funcionário
                            </Typography>
                        </CardContent>
                        <CardActions className={styles().grid}>
                            <Link to='/jm-system/comissao' style={{ textDecoration: 'none' }}>
                                <Button style={{ display: 'flex' }} size="small">gerar um recibo de comissão</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid className={styles().grid} item xs={12} sm={12} md={6} lg={4}>
                    <Card className={styles().rooters}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Empresa
                            </Typography>
                            <Typography className={styles().pos} color="textSecondary">
                                Destinado a empresas compradoras
                            </Typography>
                            <Typography variant="body2" component="p">
                                Requer dados pessoais da empresa
                            </Typography>
                        </CardContent>
                        <CardActions className={styles().grid}>
                            <Link to='/jm-system/empresa' style={{ textDecoration: 'none' }}>
                                <Button size="small">gerar um recibo de venda</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid className={styles().grid} item xs={12} sm={12} md={3} lg={4}>
                    <Card className={styles().rooters}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Cliente
                            </Typography>
                            <Typography className={styles().pos} color="textSecondary">
                                Destinado a clientes físicos
                            </Typography>
                            <Typography variant="body2" component="p">
                                Requer dados pessoais do cliente
                            </Typography>
                        </CardContent>
                        <CardActions className={styles().grid}>
                            <Link to='/jm-system/cliente' style={{ textDecoration: 'none' }}>
                                <Button size="small">gerar um recibo de venda</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default Home;