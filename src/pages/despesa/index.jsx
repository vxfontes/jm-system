import React, { useState } from "react";
import { TextField, Container, Typography, Dialog, Grid, MenuItem } from '@material-ui/core/';
import { AlertTitle, Alert } from '@material-ui/lab';
import { collection, addDoc } from 'firebase/firestore';
import { Formik, Field, Form } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';

// local
import ComprovantePDF from "../../PDF/comprovanteCompra";
import { schemaCompraPalete } from '../../utils/schema';
import palete from '../../image/palete.png';
import styles from './styles';
import ColorButtonBlue from '../../components/button/Blue';
import { dataBaseApp } from "../../firebase";

const CompraPalete = () => {
    const refTabela = collection(dataBaseApp, "compraPalete");
    const [openAlert, setOpenAlert] = useState(false);

    async function enviandoValores(values) {
        try {
            const docRef = await addDoc(refTabela, {
                quantidade: values.quantidade,
                valor: values.valorUnitario,
                total: Number(parseFloat(values.valorUnitario) * parseFloat(values.quantidade)).toFixed(2),
                data: values.data,
                unidade: values.unidade,
                tipoDePalete: values.tipoDePalete,
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
        ComprovantePDF(values)
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
            <Grid container justifyContent="center" alignItems="center">
                <Container className={styles().image} style={{ display: 'block' }}>
                    <img src={palete} width='150px' alt="jm-paletes" />
                </Container>
                <Grid item sm={8} xs={12} className={styles().containerPrincipal} style={{ display: 'block' }}>
                    <Formik initialValues={{
                        quantidade: '',
                        valorUnitario: '',
                        unidade: '',
                        data: '',
                        tipoDePalete: '',
                    }}
                        validationSchema={schemaCompraPalete}
                        onSubmit={onSubmit}>

                        {({ values, errors, touched, handleChange }) => (
                            <Form>
                                <Dialog open={openAlert} onClose={handleClose}>
                                    <Alert severity="info" color="info" variant="filled">
                                        <AlertTitle><strong>Comprovante enviado com sucesso</strong></AlertTitle>
                                        <p>O comprovante de compra de palete já está pronto</p>
                                    </Alert>
                                </Dialog>
                                <Typography style={{ margin: '30px 20px 20px 20px' }} variant="h5" gutterBottom>Gerador de comprovante de compra</Typography>

                                <Container>
                                    <TextField select className={styles().textField} name='tipoDePalete' variant="filled" label='Tipo de Palete'
                                        onChange={(e) => values.tipoDePalete = e.target.value} error={touched.tipoDePalete && Boolean(errors.tipoDePalete)}
                                        helperText={touched.tipoDePalete && errors.tipoDePalete}>
                                        <MenuItem value={'Palete PBR'}>Palete PBR</MenuItem>
                                        <MenuItem value={"Palete Descartável"}>Palete Descartável</MenuItem>
                                        <MenuItem value={"Chapatex"}>Chapatex</MenuItem>
                                    </TextField>
                                    <Field className={styles().textField} name='quantidade' type='number' component={MuiComp} placeholder="Quantidade" />
                                    <Field className={styles().textField} name='valorUnitario' type='number' component={MuiComp} placeholder="Valor Unitário" InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                    <TextField className={styles().textField} name='total' disabled variant="filled" placeholder="Total" value={(Number(parseFloat(values.valorUnitario) * parseFloat(values.quantidade))).toFixed(2)}
                                        InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }} />
                                    <TextField name='data' className={styles().textField} type='date' variant="filled" format="dd/MM/yyyy" label='Data'
                                        value={values.data} onChange={handleChange} error={touched.data && Boolean(errors.data)}
                                        helperText={touched.data && errors.data} />
                                    <TextField select className={styles().textField} name='unidade' variant="filled" label='Unidade'
                                        onChange={(e) => values.unidade = e.target.value} error={touched.unidade && Boolean(errors.unidade)}
                                        helperText={touched.unidade && errors.unidade}>
                                        <MenuItem value='BR-324'>BR-324</MenuItem>
                                        <MenuItem value="Sobradinho">Sobradinho</MenuItem>
                                    </TextField>
                                    <ColorButtonBlue className={styles().button} type='submit'>Gerar PDF</ColorButtonBlue>
                                </Container>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </>
    );
}

export default CompraPalete;