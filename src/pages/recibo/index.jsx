import React, { useState } from "react";
import { TextField, Container, Typography, Dialog, Grid, MenuItem } from '@material-ui/core/';
import { AlertTitle, Alert } from '@material-ui/lab';
import { Formik, Field, Form } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';

// local
import ReciboPDF from "../../PDF/reciboPDF";
import { schemaRecibo } from '../../utils/schema';
import palete from '../../image/palete.png';
import styles from './styles';
import ColorButtonBlue from '../../components/button/Blue';
import ColorButtonRed from '../../components/button/Red';
import { cpfMask } from "../../components/cpf";

const Recibo = () => {
    const [cpf, setCpf] = useState();
    const [openAlert, setOpenAlert] = useState(false);

    function handleChange(e) {
        setCpf(cpfMask(e.target.value))
    }

    function handleClose() {
        setOpenAlert(false);
    };

    function handleOpen() {
        setOpenAlert(true);
    };

    const onSubmit = (values) => {
        handleOpen();
    }

    const MuiComp = ({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...props
    }) => (
        <div>
            <TextField {...field} {...props} variant="filled"
                error={touched[field.name] && Boolean(errors[field.name])} helperText={touched[field.name] && errors[field.name]} />
        </div>
    );

    return (
        <>
            <Container className={styles().image} style={{ display: 'block' }}>
                <img src={palete} width='150px' />
            </Container>
            <Container className={styles().containerPrincipal} style={{ display: 'block' }}>
                <Formik initialValues={{
                    nome: '',
                    quantidade: '',
                    valorUnitario: '',
                    unidade: '',
                }}
                    validationSchema={schemaRecibo}
                    onSubmit={onSubmit}>

                    {({ values, errors, touched }) => (
                        <Form>
                            <Dialog open={openAlert} onClose={handleClose}>
                                <Alert severity="info" color="info" variant="filled">
                                    <AlertTitle><strong>Recibo enviado com sucesso</strong></AlertTitle>
                                    <p>O recibo no nome de {values.nome} já está pronto</p>
                                </Alert>
                            </Dialog>
                            <Typography style={{ margin: '30px 20px 20px 20px' }} variant="h5" gutterBottom>Gerador de recibo</Typography>

                            <Container>
                                <Field className={styles().textField} name='nome' type='text' component={MuiComp} placeholder="Nome" />
                                <TextField className={styles().textField} variant="filled" name='cpf' type='text' placeholder="CPF" maxLength='14' value={cpf} onChange={handleChange} />
                                <Field className={styles().textField} name='quantidade' type='number' component={MuiComp} placeholder="Quantidade" InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                <Field className={styles().textField} name='valorUnitario' type='number' component={MuiComp} placeholder="Valor Unitário" InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                <TextField className={styles().textField} name='total' disabled variant="filled" placeholder="Total" value={(Number(parseFloat(values.valorUnitario) * parseFloat(values.quantidade))).toFixed(2)}
                                    InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                <TextField select className={styles().textField} name='unidade' variant="filled" label='Unidade'
                                    onChange={(e) => values.unidade = e.target.value} error={touched.unidade && Boolean(errors.unidade)}
                                    helperText={touched.unidade && errors.unidade}>
                                    <MenuItem value='BR-324'>BR-324</MenuItem>
                                    <MenuItem value="Sobradinho">Sobradinho</MenuItem>
                                </TextField>
                            </Container>

                            <Grid container className={styles().maxSpace}>
                                <Grid item xs={6}>
                                    <ColorButtonBlue className={styles().button} type='submit'>Enviar</ColorButtonBlue>
                                </Grid>
                                <Grid item xs={6}>
                                    <ColorButtonRed className={styles().button} onClick={() => { console.log(values, cpf); ReciboPDF(values, cpf) }} >Gerar PDF</ColorButtonRed>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    );
}

export default Recibo;