import React, { useState } from "react";
import { Button, TextField, Container, Typography, Collapse, IconButton, Box } from '@material-ui/core/';
import ReciboPDF from "../../PDF/reciboPDF";
import { Formik, Field, Form } from 'formik';
import { schemaRecibo } from '../../utils/schema';

const Recibo = () => {

    const [dados, setDados] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
    })

    function onChange(ev) {
        setDados({
            ...dados,
            [ev.target.name]: ev.target.value
        })
    }

    function enviei(values, actions) {
        console.log('enviado', values);
    }

    const MuiComp = ({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...props
    }) => (
        <div>
            <TextField {...field} {...props} variant="filled" value={values.oldPassword}
                error={touched[field.name] && Boolean(errors[field.name])} helperText={touched[field.name] && errors[field.name]} />
        </div>
    );

    return (
        <>
            <Formik initialValues={{
                nome: '',
                quantidade: '',
                valorUnitario: '',
            }}
                validationSchema={schemaRecibo}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                }}>

                {({ values, errors, touched }) => (
                    <Form>
                        <Typography style={{ margin: '30px 20px 20px 20px' }} variant="h4" gutterBottom>Recibo</Typography>
                        <Field name='nome' type='text' component={MuiComp} placeholder="Nome" />
                        <Field name='quantidade' type='number' component={MuiComp} placeholder="Quantidade" />
                        <Field name='valorUnitario' type='number' component={MuiComp} placeholder="Valor Unitário" />
                        <button type='submit'>Enviar</button>
                        <button onClick={() => ReciboPDF(values)} >Gerar PDF</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Recibo;