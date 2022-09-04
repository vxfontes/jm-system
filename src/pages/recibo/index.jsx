import React, { useState, useMemo } from "react";
import { Button, TextField, Container, Typography, InputLabel, Select, Grid, MenuItem, FormControl } from '@material-ui/core/';
import ReciboPDF from "../../PDF/reciboPDF";
import { Formik, Field, Form } from 'formik';
import { schemaRecibo } from '../../utils/schema';
import palete from '../../image/palete.png';
import styles from './styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import ColorButtonBlue from '../../components/button/Blue';
import ColorButtonRed from '../../components/button/Red';

const Recibo = () => {

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
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}>

                    {({ values, errors, touched }) => (
                        <Form>
                            <Typography style={{ margin: '30px 20px 20px 20px' }} variant="h5" gutterBottom>Gerador de recibo</Typography>

                            <Container>
                                <Field className={styles().textField} name='nome' type='text' component={MuiComp} placeholder="Nome" />
                                <Field className={styles().textField} name='quantidade' type='number' component={MuiComp} placeholder="Quantidade" InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                <Field className={styles().textField} name='valorUnitario' type='number' component={MuiComp} placeholder="Valor Unitário" InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                <TextField className={styles().textField} name='total' disabled variant="filled" placeholder="Total" value={Number(parseFloat(values.valorUnitario) * parseFloat(values.quantidade))} 
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
                                    <ColorButtonRed className={styles().button} onClick={() => {ReciboPDF(values)}} >Gerar PDF</ColorButtonRed>
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