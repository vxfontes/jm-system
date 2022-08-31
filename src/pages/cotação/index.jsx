import React from "react";
import { useState } from "react";
import CotacaoPDF from "../../PDF/cotacaoPDF";

const Cotacao = () => {

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

    function enviei(a, b) {
        console.log(dados.age)
        console.log(dados.email)
        console.log(dados.gender)
        console.log(dados.name)
    }


    return (
        <>
            <h1>campos de teste</h1>

            <label>Nome: </label>
            <input name='name' type='text' value={dados.name} onChange={onChange} />

            <label>Email: </label>
            <input name='email' type='email' value={dados.email} onChange={onChange} />

            <label>Idade: </label>
            <input name='age' type='number' value={dados.age} onChange={onChange} />

            <label>Sexo: </label>
            <input name='gender' type='text' value={dados.gender} onChange={onChange} />

            <button onClick={() => enviei()}>Enviar</button>
            <button onClick={() => CotacaoPDF(dados)} >Gerar PDF</button>
        </>
    );
}

export default Cotacao;