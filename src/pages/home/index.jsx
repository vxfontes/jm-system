import React from 'react';
import styles from './styles';
import { Container, Typography, Box } from '@material-ui/core';
import ColorButtonBlue from '../../components/button/Blue';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <>
            <Container className={styles().root}>
                <Container className={styles().container}>
                    <Link to='/comissao' style={{ textDecoration: 'none' }}>
                        <ColorButtonBlue className={styles().paper}>
                            <Typography variant='h5'>Recibo de <strong>comissão</strong></Typography>
                        </ColorButtonBlue>
                    </Link>
                    <Link to='/empresa' style={{ textDecoration: 'none' }}>
                        <ColorButtonBlue className={styles().paper}>
                            <Typography variant='h5'>Recibo compra para <strong>empresas</strong></Typography>
                        </ColorButtonBlue>
                    </Link>
                    <Link to='/cliente' style={{ textDecoration: 'none' }}>
                        <ColorButtonBlue className={styles().paper}>
                            <Typography variant='h5'>Recibo compra para <br /><strong>pessoa física</strong></Typography>
                        </ColorButtonBlue>
                    </Link>
                </Container>
            </Container>
        </>
    );
}

export default Home;