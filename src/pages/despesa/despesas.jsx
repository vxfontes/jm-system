import React, { useState } from "react";
import { TextField, Container, Typography, Dialog, Grid, MenuItem } from '@material-ui/core/';
import { AlertTitle, Alert } from '@material-ui/lab';
import { collection, addDoc } from 'firebase/firestore';
import { Formik, Field, Form } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';

// local
import { schemaDespesas } from '../../utils/schema';
import palete from '../../image/palete.png';
import styles from './styles';
import ColorButtonBlue from '../../components/button/Blue';
import { dataBaseApp } from "../../firebase";

const Despesas = () => {
    const refTabela = collection(dataBaseApp, "despesas");
    const [openAlert, setOpenAlert] = useState(false);

    async function enviandoValores(values) {
        try {
            const docRef = await addDoc(refTabela, {
                nomeDaDespesa: values.nomeDaDespesa,
                tipoDeDespesa: values.tipoDeDespesa,
                valor: values.valor,
                data: values.data,
                unidade: values.unidade,
                type: 'despesa'
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Erro ao salvar, reinicie e tente novamente")
        }
    }

    function handleClose() {
        setOpenAlert(false);
    };

    function handleOpen() {
        setOpenAlert(true);
    };

    const onSubmit = (values) => {
        enviandoValores(values);
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
        <Grid container justifyContent="center" alignItems="center">
            <Container className={styles().image} style={{ display: 'block' }}>
                <img src={palete} width='150px' alt="jm-paletes" />
            </Container>
            <Grid item sm={8} xs={12} className={styles().containerPrincipal} style={{ display: 'block' }}>
                <Formik initialValues={{
                    nomeDaDespesa: '',
                    tipoDeDespesa: '',
                    valor: '',
                    data: '',
                    unidade: '',
                }}
                    validationSchema={schemaDespesas}
                    onSubmit={onSubmit}>

                    {({ values, errors, touched, handleChange }) => (
                        <Form>
                            <Dialog open={openAlert} onClose={handleClose}>
                                <Alert severity="info" color="info" variant="filled">
                                    <AlertTitle><strong>Despesa adicionada</strong></AlertTitle>
                                    <p>Despesa cadastrada com sucesso</p>
                                </Alert>
                            </Dialog>
                            <Typography style={{ margin: '30px 20px 20px 20px' }} variant="h5" gutterBottom>Cadastro de despesas</Typography>

                            <Container>
                                <Field className={styles().textField} name='nomeDaDespesa' type='text' component={MuiComp} placeholder="Nome da Despesa" />
                                <TextField select className={styles().textField} name='tipoDeDespesa' variant="filled" label='Tipo de Despesa'
                                    onChange={(e) => values.tipoDeDespesa = e.target.value} error={touched.tipoDeDespesa && Boolean(errors.tipoDeDespesa)}
                                    helperText={touched.tipoDeDespesa && errors.tipoDeDespesa}>
                                    <MenuItem value={'Água'}>Água</MenuItem>
                                    <MenuItem value={"Luz"}>Luz</MenuItem>
                                    <MenuItem value={"Internet"}>Internet</MenuItem>
                                    <MenuItem value={"Aluguel"}>Aluguel</MenuItem>
                                    <MenuItem value={"Gasolina"}>Gasolina</MenuItem>
                                    <MenuItem value={"Outros"}>Outros</MenuItem>
                                </TextField>
                                <Field className={styles().textField} name='valor' type='number' component={MuiComp} placeholder="Valor" InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                <TextField name='data' className={styles().textField} type='date' variant="filled" format="dd/MM/yyyy" label='Data'
                                    value={values.data} onChange={handleChange} error={touched.data && Boolean(errors.data)}
                                    helperText={touched.data && errors.data} />
                                <TextField select className={styles().textField} name='unidade' variant="filled" label='Unidade'
                                    onChange={(e) => values.unidade = e.target.value} error={touched.unidade && Boolean(errors.unidade)}
                                    helperText={touched.unidade && errors.unidade}>
                                    <MenuItem value='BR-324'>BR-324</MenuItem>
                                    <MenuItem value="Sobradinho">Sobradinho</MenuItem>
                                </TextField>
                                <ColorButtonBlue className={styles().button} type='submit'>Salvar Despesa</ColorButtonBlue>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

export default Despesas;