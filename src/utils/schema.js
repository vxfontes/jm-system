import * as yup from 'yup';

export const schemaRecibo = yup.object().shape({
    nome: yup
        .string()
        .required("Escreva seu nome"),
    valorUnitario: yup
        .number()
        .required("Informe o valor de cada palete"),
    quantidade: yup
        .number()
        .required("Informe a quantidade de paletes"),
    // createdOn: date().default(() => new Date()),
})