import * as yup from 'yup';

export const schemaRecibo = yup.object().shape({
    nome: yup
        .string()
        .required("Escreva seu nome"),
    valorUnitario: yup
        .number()
        .positive("O número precisa ser positivo")
        .required("Informe o valor de cada palete"),
    quantidade: yup
        .number()
        .positive("O número precisa ser positivo")
        .integer('Quantidade não pode ser um valor decimal')
        .required("Informe a quantidade de paletes"),
    unidade: yup
        .string()
        .ensure()
        .required("Selecione a unidade"),
    data: yup
        .date()
        .required("Insira a data do pagamento")
})