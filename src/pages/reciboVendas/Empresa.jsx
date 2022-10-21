import React, { useState } from "react";
import {
    TextField, Container, Typography, Dialog, Grid, MenuItem, DialogTitle,
    DialogContent, Table, TableHead, TableCell, TableBody, TableRow
} from '@material-ui/core/';
import { AlertTitle, Alert } from '@material-ui/lab';
import { Formik, Field, Form } from 'formik';
import { collection, addDoc } from 'firebase/firestore'
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';

// local
import { schemaReciboEmpresa } from '../../utils/schema';
import palete from '../../image/palete.png';
import styles from './styles';
import { dataBaseApp } from "../../firebase";
import ColorButtonBlue from '../../components/button/Blue';
import ColorButtonRed from '../../components/button/Red';
import { cnpjMask } from "../../components/cnpj";
import ReciboEmpresaPDF from "../../PDF/reciboEmpresa";

const ReciboEmpresa = () => {

    const refTabela = collection(dataBaseApp, "vendasRecibos")
    const [cnpj, setCnpj] = useState();
    const [quantTotal, setQuantTotal] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [vendas, setVendas] = useState([]);
    let key = 0;
    const perfil = {
        masc: 'cnpj',
        inicio: 'A empresa'
    }

    async function enviandoValores(values, total) {
        try {
            const docRef = await addDoc(refTabela, {
                quantidade: values.quantidade,
                type: 'venda',
                valor: values.valorUnitario,
                total: Number(parseFloat(total)),
                tipo: values.tipoDePalete,
                data: values.data,
                comprador: {
                    type: 'empresa',
                    nome: values.nome,
                    dado: cnpj,
                    unidade: values.unidade,
                }
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Erro ao salvar, reinicie e tente novamente")
        }
    }

    function handleChangeCNPJ(e) {
        setCnpj(cnpjMask(e.target.value))
    }

    function handleClose() {
        setOpenAlert(false);
    };

    function handleOpen() {
        setOpenAlert(true);
    };

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onSubmit = (values) => {
        handleOpen();
        ReciboEmpresaPDF(values, vendas, perfil, cnpj, quantTotal)
    }

    const adicionar = (values) => {
        const total = (Number(parseFloat(values.valorUnitario) * parseFloat(values.quantidade))).toFixed(2);
        setQuantTotal(Number(parseInt(values.quantidade)) + quantTotal);

        enviandoValores(values, total);

        const newVenda = [
            ...vendas,
            {
                tipoDePalete: values.tipoDePalete,
                valorUnitario: values.valorUnitario,
                quantidade: values.quantidade,
                total: total,
            },
        ];

        setVendas(newVenda);
        handleClickOpenModal();
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

            <Dialog fullWidth={true} maxWidth='sm' open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Paletes comprados</DialogTitle>
                <DialogContent>

                    <Table>
                        <TableHead>
                            <TableCell align="left"><Typography variant="body1" gutterBottom>Tipo de Palete</Typography></TableCell>
                            <TableCell align="left"><Typography variant="body1" gutterBottom>Valor por unidade</Typography></TableCell>
                            <TableCell align="left"><Typography variant="body1" gutterBottom>Quantidade</Typography></TableCell>
                            <TableCell align="left"><Typography variant="body1" gutterBottom>Total</Typography></TableCell>
                        </TableHead>

                        <TableBody>
                            {vendas.map((palete) => {
                                key++;
                                return (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">{palete.tipoDePalete}</TableCell>
                                        <TableCell align="center">R$ {palete.valorUnitario}</TableCell>
                                        <TableCell align="center">{palete.quantidade}</TableCell>
                                        <TableCell align="center">R$ {palete.total}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>


            <Container className={styles().image} style={{ display: 'block' }}>
                <img src={palete} width='150px' alt="jm-paletes" />
            </Container>
            <Grid item sm={8} xs={12} className={styles().containerPrincipal} style={{ display: 'block' }}>
                <Formik initialValues={{
                    nome: '',
                    quantidade: '',
                    valorUnitario: '',
                    unidade: '',
                    tipoDePalete: '',
                    data: ''
                }}
                    validationSchema={schemaReciboEmpresa}
                    onSubmit={onSubmit}>

                    {({ values, errors, touched, handleChange }) => (
                        <Form>
                            <Dialog open={openAlert} onClose={handleClose}>
                                <Alert severity="info" color="info" variant="filled">
                                    <AlertTitle><strong>Recibo enviado com sucesso</strong></AlertTitle>
                                    <p>O recibo no nome de {values.nome} já está pronto</p>
                                </Alert>
                            </Dialog>
                            <Typography style={{ margin: '30px 20px 20px 20px' }} variant="h5" gutterBottom>Recibo de compra para empresas</Typography>

                            <Container>
                                <Field className={styles().textField} name='nome' type='text' component={MuiComp} placeholder="Nome da empresa" />
                                <TextField className={styles().textField} variant="filled" name='cnpj' type='text' placeholder="CNPJ" maxLength='14' value={cnpj} onChange={handleChangeCNPJ} />
                                <TextField select className={styles().textField} name='tipoDePalete' variant="filled" label='Tipo de Palete'
                                    onChange={(e) => values.tipoDePalete = e.target.value} error={touched.tipoDePalete && Boolean(errors.tipoDePalete)}
                                    helperText={touched.tipoDePalete && errors.tipoDePalete}>
                                    <MenuItem value={'Palete PBR'}>Palete PBR</MenuItem>
                                    <MenuItem value={"Palete Descartável"}>Descartável</MenuItem>
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
                                    <MenuItem value={'BR-324'}>BR-324</MenuItem>
                                    <MenuItem value={"Sobradinho"}>Sobradinho</MenuItem>
                                </TextField>
                                <Grid container className={styles().maxSpace} spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <ColorButtonRed className={styles().button} onClick={() => adicionar(values)}>Adicionar palete</ColorButtonRed>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ColorButtonBlue className={styles().button} type='submit'>Gerar PDF</ColorButtonBlue>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

export default ReciboEmpresa;