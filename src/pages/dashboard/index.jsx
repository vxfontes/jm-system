import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { dataBaseApp } from "../../firebase";
import MainDashboard from './dashboard';

const Dashboard = () => {
    const vendasRecibos = collection(dataBaseApp, "vendasRecibos");
    const comissaoRecibos = collection(dataBaseApp, "comissao");
    const compraPalete = collection(dataBaseApp, "compraPalete");
    const despesasCd = collection(dataBaseApp, "despesas");

    let data, empty
    let totalVendas = 0, totalCompras = 0, totalComissao = 0, totalDespesas = 0;
    let paletesVenda = 0, paletesCompra = 0;
    let saidasTotais = 0, lucroLiq = 0;

    const [vendas, setVendas] = useState({});
    const [comissao, setComissao] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [compra, setCompra] = useState([]);

    const [loading, setLoading] = useState(false);
    const [initCalc, setInitCalc] = useState(false);

    function getVendas() {
        getDocs(vendasRecibos).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setVendas(data)
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error.response);
        })
    }

    function getComissao() {
        getDocs(comissaoRecibos).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setComissao(data)
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        })
    }

    function getDespesas() {
        getDocs(despesasCd).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setDespesas(data)
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        })
    }

    function getCompra() {
        getDocs(compraPalete).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setCompra(data)
            empty = response.empty;
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        })
    }

    useEffect(() => {
        setInitCalc(false)
        getVendas()
        getComissao();
        getDespesas();
        getCompra();
        setTimeout(() => {
            // carrega e verifica se a ultima função recebe um array vazio
            // se sim - nao termina o loading e redireciona usuario
            if (empty === false) {
                setInitCalc(true);
                setLoading(true);
            } else {
                window.alert('Erro ao receber dados, por favor cadastre algum item')
                window.location.replace("/jm-system/");
            }
        }, 3000)
    }, [empty]);


    function consoles() {
        console.log("total compra", totalCompras)
        console.log("total venda", totalVendas)
        console.log("total despesa", totalDespesas)
        console.log("total comissao", totalComissao)
        console.log(saidasTotais, lucroLiq, paletesVenda, paletesCompra);
    }

    function somaTotais() {
        vendas.map((venda) => {
            let dt = Number(parseFloat(venda.total))
            totalVendas = (totalVendas + dt)
            paletesVenda = paletesVenda + venda.quantidade
        })
        comissao.map((comissao) => {
            let dt = Number(parseFloat(comissao.total))
            totalComissao = (totalComissao + dt)
        })
        despesas.map((Despesas) => {
            let dt = Number(parseFloat(Despesas.valor))
            totalDespesas = (totalDespesas + dt)
        })
        compra.map((compra) => {
            let dt = Number(parseFloat(compra.total))
            totalCompras = (totalCompras + dt)
            paletesCompra = paletesCompra + compra.quantidade
        })
    }

    

    // principal da pagina
    if (initCalc === true) {
        somaTotais()
        saidasTotais = (totalComissao + totalCompras + totalDespesas);
        lucroLiq = totalVendas - saidasTotais;
        consoles()
    } else {
        console.log('carregando dados');
    }

    return (
        <>
            {
                loading ? (
                    <>
                        <h1>foi</h1>
                        {/* <MainDashboard /> */}
                    </>
                ) : (
                    <h1>carregando...</h1>
                )
            }
        </>
    )
}

export default Dashboard;