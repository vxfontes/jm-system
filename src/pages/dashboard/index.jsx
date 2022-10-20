import { collection, addDoc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { dataBaseApp } from "../../firebase";
import MainDashboard from './dashboard';

const Dashboard = () => {
    const vendasRecibos = collection(dataBaseApp, "vendasRecibos");
    const comissaoRecibos = collection(dataBaseApp, "comissao");
    const compraPalete = collection(dataBaseApp, "compraPalete");
    const despesasCd = collection(dataBaseApp, "despesas");

    const [vendas, setVendas] = useState({});
    const [vendasTotal, setVendasTotal] = useState(0);
    let teste
    const [comissao, setComissao] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [compra, setCompra] = useState([]);

    const [loading, setLoading] = useState(true);

    function getVendas() {
        getDocs(vendasRecibos).then((response) => {
            const data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setVendas(data)
            data.map((venda) => {
                console.log(venda)
                setVendasTotal(vendasTotal + venda.total)
            })
            console.log(vendasTotal)
        }).catch((error) => {
            alert("DEU RUIM");
            console.log(error);
        })
    }

    
    // useEffect(() => {
    //     setLoading(false);

    //     // const getVendas = async () => {
        //     //     const data = await getDocs(vendasRecibos);
    //     //     // setVendas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     //     teste = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     //     console.log(data);
    //     //     console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     //     // console.log(vendas);
    //     //     console.log(teste);
    //     //     teste.map((venda) => {
        //     //         console.log(venda)
        //     //         setVendasTotal(vendasTotal + venda.total)
        //     //     })
        //     //     console.log(vendasTotal)
        //     // };
        
    //     const getComissao = async () => {
    //         const data = await getDocs(comissaoRecibos);
    //         setComissao(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };

    //     const getDespesas = async () => {
    //         const data = await getDocs(despesasCd);
    //         setDespesas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };

    //     const getCompra = async () => {
    //         const data = await getDocs(compraPalete);
    //         setCompra(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };

    //     getVendas();
    //     getComissao();
    //     getDespesas();
    //     getCompra();
    //     // console.log(vendas)
    //     console.log(vendasTotal, "TOTAL DE VENDAS")
    //     setLoading(true)
    // }, []);


    useEffect(() => {
        getVendas()
        console.log(vendas);
        console.log(vendasTotal);
    }, [])


    return (
        <>

        </>
    )
}

export default Dashboard;