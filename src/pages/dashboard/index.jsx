import { collection, getDocs, where, query, orderBy, setDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { dataBaseApp } from "../../firebase";
import MainDashboard from './mainDashboard';
import { format } from 'date-fns';
import { Box, CircularProgress, Grid } from '@material-ui/core';

const timeElapsed = Date.now();
const today = format(new Date(timeElapsed), 'yyyy-MM-01').toString();
const mes = format(new Date(timeElapsed), 'MM-yyyy').toString();

let data, empty, db, totalGeral = {}, databases = {}, ultimasAlteracoes = [];
let totalVendas = 0, totalCompras = 0, totalComissao = 0, totalDespesas = 0;
let paletesVenda = 0, paletesCompra = 0;
let saidasTotais = 0, lucroLiq = 0;
let totalVendasMes = 0, totalComprasMes = 0, totalComissaoMes = 0, totalDespesasMes = 0;
let paletesVendaMes = 0, paletesCompraMes = 0;
let saidasTotaisMes = 0, lucroLiqMes = 0;

// ao fim de todo processo, as variaveis utilizadas no dashboard serao: 
// lucro total, lucro total liquido, despesas, quant paletes vendidos e comprados = totalGeral
// ultimas compras e vendas = month
// mes atual = main


const Dashboard = () => {
    const vendasRecibos = collection(dataBaseApp, "vendasRecibos");
    const comissaoRecibos = collection(dataBaseApp, "comissao");
    const compraPalete = collection(dataBaseApp, "compraPalete");
    const despesasCd = collection(dataBaseApp, "despesas");
    const gettingMeses = collection(dataBaseApp, "months");
    const gettingMainMonth = collection(dataBaseApp, "mainMonth");

    const [vendas, setVendas] = useState([]);
    const [comissao, setComissao] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [compra, setCompra] = useState([]);

    const [month, setMonth] = useState([]);
    const [meses, setMeses] = useState([]);
    const [main, setMain] = useState([]);

    const [erroLenght, setErroLenght] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initCalc, setInitCalc] = useState(false);

    // as 4 funções abaixo puxam do banco de dados e ja implementam pegar os mais recentes
    function getVendas() {
        getDocs(vendasRecibos).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setVendas(data)
        }).then(async () => {
            let getting = await getDocs(query(vendasRecibos, where("data", ">", today), orderBy("data", "desc")));
            db = (getting.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            if (db.length !== 0) {
                setMonth(db)
            } else {
                setErroLenght(...erroLenght, ['vendas'])
            }
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error.response);
        })
    }

    function getComissao() {
        getDocs(comissaoRecibos).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setComissao(data)
        }).then(async () => {
            let getting = await getDocs(query(comissaoRecibos, where("data", ">", today), orderBy("data", "desc")));
            let db = (getting.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            if (db.length !== 0) {
                setMonth(prevState => [...prevState, ...db])
            } else {
                setErroLenght(...erroLenght, ['comissão'])
            }
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        })
    }

    function getDespesas() {
        getDocs(despesasCd).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setDespesas(data)
        }).then(async () => {
            let getting = await getDocs(query(despesasCd, where("data", ">", today), orderBy("data", "desc")));
            let db = (getting.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            if (db.length !== 0) {
                setMonth(prevState => [...prevState, ...db])
            } else {
                setErroLenght(...erroLenght, ['despesa'])
            }
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
        }).then(async () => {
            let getting = await getDocs(query(compraPalete, where("data", ">", today), orderBy("data", "desc")));
            db = (getting.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            if (db.length !== 0) {
                setMonth(prevState => [...prevState, ...db])
            } else {
                setErroLenght(...erroLenght, ['compra'])
            }
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        })
    }

    function getMeses() {
        getDocs(gettingMeses).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setMeses(data);
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        });

        getDocs(gettingMainMonth).then((response) => {
            data = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            data.map((d) => {
                setMain(d)
            })
        }).catch((error) => {
            alert("Não foi possível conectar-se com o banco de dados");
            console.log(error);
        });
    }

    function sortMonth() {
        function SortArray(x, y) {
            if (x.data < y.data) { return 1; }
            if (x.data > y.data) { return -1; }
            return 0;
        }
        month.sort(SortArray);
    }

    useEffect(() => {
        setInitCalc(false)
        getVendas()
        getComissao();
        getDespesas();
        getCompra();
        getMeses();
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
    }, []);


    function consoles() {
        console.log("total compra", totalCompras)
        console.log("total venda", totalVendas)
        console.log("total despesa", totalDespesas)
        console.log("total comissao", totalComissao)
        console.log("valor mes", month)
        console.log('erro tamanho', erroLenght)
        console.log('total', totalGeral);
        console.log('mes', saidasTotaisMes, lucroLiqMes, paletesVendaMes, paletesCompraMes);
        console.log('imprimindo meses', meses);
        console.log('database', databases)
    }

    function enviarMes() {
        setDoc(doc(dataBaseApp, "mainMonth", "mainMonth"), {
            mes: mes,
            saidasTotais: saidasTotaisMes,
            lucroLiq: lucroLiqMes,
            lucroBruto: totalVendasMes,
            paletesVenda: paletesVendaMes,
            paletesCompra: paletesCompraMes,
        });
        setDoc(doc(dataBaseApp, "months", mes), {
            mes: mes,
            saidasTotais: saidasTotaisMes,
            lucroLiq: lucroLiqMes,
            lucroBruto: totalVendasMes,
            paletesVenda: paletesVendaMes,
            paletesCompra: paletesCompraMes,
        });
    }

    function enviarTotal() {
        totalGeral = {
            saidasTotais: saidasTotais,
            lucroLiq: lucroLiq,
            lucroBruto: totalVendas,
            paletesVenda: paletesVenda,
            paletesCompra: paletesCompra,
        };

        setDoc(doc(dataBaseApp, "total", "main"), {
            saidasTotais: saidasTotais,
            lucroLiq: lucroLiq,
            lucroBruto: totalVendas,
            paletesVenda: paletesVenda,
            paletesCompra: paletesCompra,
        });
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

    function somasMensais() {
        if (month.length !== 0) {
            month.map((dataMonth) => {
                if (dataMonth.type === 'venda') {
                    let dt = Number(parseFloat(dataMonth.total))
                    totalVendasMes = (totalVendasMes + dt)
                    paletesVendaMes = paletesVendaMes + dataMonth.quantidade
                }

                if (dataMonth.type === 'compra') {
                    let dt = Number(parseFloat(dataMonth.total))
                    totalComprasMes = (totalComprasMes + dt)
                    paletesCompraMes = paletesCompraMes + dataMonth.quantidade
                }

                if (dataMonth.type === 'despesa') {
                    let dt = Number(parseFloat(dataMonth.valor))
                    totalDespesasMes = (totalDespesasMes + dt)
                }

                if (dataMonth.type === 'comissao') {
                    let dt = Number(parseFloat(dataMonth.total))
                    totalComissaoMes = (totalComissaoMes + dt)
                }
            })
        } else {
            alert("Não foi possível realizar a leitura dos dados mensais")
        }
    }


    // GRAFICOS 
    function loadDataPrincipal() {
        const mes = meses.map((mes) => mes.mes,)
        const resultLiq = meses.map((mes) => mes.lucroLiq,)
        const resultBt = meses.map((mes) => mes.lucroBruto,)
        const saidas = meses.map((mes) => mes.saidasTotais,)

        return {
            categories: [...mes],
            series: [
                {
                    name: 'Lucro Líquido',
                    data: [...resultLiq]
                },
                {
                    name: 'Lucro Bruto',
                    data: [...resultBt]
                },
                {
                    name: 'Saidas Totais',
                    data: [...saidas]
                },
            ]
        }
    }

    function loadData(type) {
        if (type === 'Lucro Bruto') {
            const result = meses.map((mes) => mes.lucroBruto,)
            const mes = meses.map((mes) => mes.mes,)

            return {
                categories: [...mes],
                series: [{
                    name: 'bruto',
                    data: [...result],
                }]
            }
        }

        if (type === 'Lucro Líquido') {
            const result = meses.map((mes) => mes.lucroLiq,)
            const mes = meses.map((mes) => mes.mes,)

            return {
                categories: [...mes],
                series: [{
                    name: 'liquido',
                    data: [...result],
                }]
            }
        }

        if (type === 'Saidas Totais') {
            const result = meses.map((mes) => mes.saidasTotais,)
            const mes = meses.map((mes) => mes.mes,)

            return {
                categories: [...mes],
                series: [{
                    name: 'saidas totais',
                    data: [...result],
                }]
            }
        }

        if (type === 'Paletes Vendidos') {
            const result = meses.map((mes) => mes.paletesVenda,)
            const mes = meses.map((mes) => mes.mes,)

            return {
                categories: [...mes],
                series: [{
                    name: 'paletes venda',
                    data: [...result],
                }]
            }
        }
    }

    // principal da pagina
    if (initCalc === true) {
        sortMonth() //array do mês atual
        somasMensais()
        somaTotais()

        // totais
        saidasTotais = (totalComissao + totalCompras + totalDespesas);
        lucroLiq = totalVendas - saidasTotais;

        // mes atual
        saidasTotaisMes = (totalComissaoMes + totalComprasMes + totalDespesasMes);
        lucroLiqMes = totalVendasMes - saidasTotaisMes;

        enviarMes()
        enviarTotal()
        ultimasAlteracoes = month.slice(0, 7);
        databases = {
            databasePrincipal: loadDataPrincipal(),
            databaseBruto: loadData('Lucro Bruto'),
            databaseLiquido: loadData('Lucro Líquido'),
            saidasTotais: loadData('Saidas Totais'),
            paletesVenda: loadData('Paletes Vendidos'),
        }

        // consoles()
    } else {
        console.log('carregando dados');
    }

    return (
        <>
            {
                loading ? (
                    <>
                        {/* <h1>foi</h1> */}
                        <MainDashboard totalGeral={totalGeral} month={ultimasAlteracoes} meses={meses} main={main} database={databases} />
                    </>
                ) : (
                    <Grid container direction="row" justifyContent="center" alignItems="center" style={{
                        width: '100%',
                        height: '100vh',
                        backgroundColor: '#208ce4',
                        display: 'flex',
                        textAlign: 'center'
                    }}>
                        <CircularProgress style={{ color: 'white', fontSize: '400px' }} />
                    </Grid>
                )
            }
        </>
    )
}

export default Dashboard;