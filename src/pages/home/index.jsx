import React from 'react';
import styles from './styles';
import { Container, Typography } from '@material-ui/core';
import ColorButtonBlue from '../../components/button/Blue';

const Home = () => {
    return (
        <Container className={styles().root}>
            <Container className={styles().container}>
                <ColorButtonBlue className={styles().paper}>
                    <Typography variant='h5'>Recibo de <span>comissão</span></Typography>
                </ColorButtonBlue>
                <ColorButtonBlue className={styles().paper}>
                    <Typography variant='h5'>Recibo compra para <span>empresas</span></Typography>
                </ColorButtonBlue>
                <ColorButtonBlue className={styles().paper}>
                    <Typography variant='h5'>Recibo compra para <span>pessoa física</span></Typography>
                </ColorButtonBlue>
            </Container>
        </Container>
    );
}

export default Home;