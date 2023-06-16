import React from 'react';
import styles from './styles';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SideBar from '../../components/sideBar';

const Home = () => {
    localStorage.clear();

    return (
        <>
            <Box className={styles().image}>
            </Box>
            <SideBar color={'primary'} />
            <Grid className={styles().root} container direction="row" justifyContent="center">

                <Grid className={styles().grid} item xs={12} sm={12} md={6} lg={4} xl={5}>
                    <Card className={styles().rooters}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Adiantamento
                            </Typography>
                            <Typography className={styles().pos} color="textSecondary">
                                Destinado a funcionários da empresa
                            </Typography>
                            <Typography variant="body2" component="p">
                                Requer assinatura de funcionário
                            </Typography>
                        </CardContent>
                        <CardActions className={styles().grid}>
                            <Link to='/comissao' style={{ textDecoration: 'none' }}>
                                <Button style={{ display: 'flex' }} size="small">gerar um recibo de adiantamento</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid className={styles().grid} item xs={12} sm={12} md={6} lg={4} xl={5}>
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
                            <Link to='/empresa' style={{ textDecoration: 'none' }}>
                                <Button size="small">gerar um recibo de venda</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid className={styles().grid} item xs={12} sm={12} md={6} lg={4} xl={5}>
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
                            <Link to='/cliente' style={{ textDecoration: 'none' }}>
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