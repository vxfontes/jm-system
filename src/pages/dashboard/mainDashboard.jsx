// import { Chart } from "react-google-charts";
import {
    Box, Button, Card, CardActionArea, CardContent, Dialog,
    DialogContent, DialogContentText, DialogTitle,
    Divider, Grid, Table, TableBody, TableCell, TableRow,
    Typography, useMediaQuery, useTheme
} from '@material-ui/core';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useStyles from './styles';
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { dataBaseApp } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { LaptopWindows, RemoveRedEye } from '@material-ui/icons';
import { useEffect } from 'react';


// propsDash: {
//     main,
//     totalGeral,
//     months = [], 
//     database = {
//         databasePrincipal,
//         databaseBruto,
//         databaseLiquido,
//         saidasTotais
//     }
// }


const MainDashboard = (propsDash) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const showLess = useMediaQuery(theme.breakpoints.only('lg'));
    const showMore = useMediaQuery(theme.breakpoints.only('xl'));
    const showSomething = useMediaQuery(theme.breakpoints.down('md'));
    const [monthAtual, setMonthAtual] = useState({})
    const [monthsAll, setMonthsAll] = useState([...propsDash.month.all]);

    function handleClose() {
        setOpenModal(false);
    };

    function handleOpen() {
        setOpenModal(true);
    };

    function handleCloseView() {
        setOpenModalView(false);
    };

    function handleOpenView() {
        setOpenModalView(true);
    };

    const optionsLineBt = {
        chart: {
            id: "basic-bar",
            sparkline: {
                enabled: true
            },
            group: 'sparklines'
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: propsDash.database.databaseBruto.categories,
        },
        tooltip: {
            fixed: {
                enabled: true,
                position: 'right'
            },
            x: {
                show: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 0
        },
        colors: ['#fff']
    }

    const optionsLineThree = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: propsDash.database.databaseBruto.categories,
        },
        dataLabels: {
            enabled: false
        },
        yaxis: {
            title: {
                text: 'R$ (reais)'
            }
        },
        fill: {
            opacity: 1
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "R$ " + val + " reais"
                }
            }
        }
    }

    function comprasEVendas(get) {
        const sort = get;

        const result = sort.map((month) => {
            if (month.type === "comissao") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='space-between' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.funcionario.nome}</Typography>
                                <Typography variant='body2' align='left'>Funcionário</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: -20 }} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.total}</Typography>
                                <Typography variant='body2' align='right' className={classes.despesa}>Despesa: comissão</Typography>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                <RemoveRedEye className={classes.actionArea} fontSize='medium' color='primary' onClick={() => { setMonthAtual(month); handleOpenView() }} />
                                <DeleteOutlineIcon className={classes.actionArea} fontSize='medium' color='secondary' onClick={() => handleDelete(month, "comissao")} />
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }

            if (month.type === "despesa") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='space-between' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.nomeDaDespesa}</Typography>
                                <Typography variant='body2' align='left'>{month.tipoDeDespesa}</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: -20 }} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.valor}</Typography>
                                <Typography variant='body2' align='right' className={classes.despesa}>Despesa: {month.unidade}</Typography>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                <RemoveRedEye className={classes.actionArea} fontSize='medium' color='primary' onClick={() => { setMonthAtual(month); handleOpenView() }} />
                                <DeleteOutlineIcon className={classes.actionArea} fontSize='medium' color='secondary' onClick={() => handleDelete(month, "despesas")} />
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }

            if (month.type === "compra") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='space-between' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.tipoDePalete}</Typography>
                                <Typography variant='body2' align='left'>{month.quantidade} paletes por {month.valor} reais</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: -20 }} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.total}</Typography>
                                <Typography variant='body2' align='right' className={classes.despesa}>Compra: {month.unidade}</Typography>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                <RemoveRedEye className={classes.actionArea} fontSize='medium' color='primary' onClick={() => { setMonthAtual(month); handleOpenView() }} />
                                <DeleteOutlineIcon className={classes.actionArea} fontSize='medium' color='secondary' onClick={() => handleDelete(month, "compraPalete")} />
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }

            if (month.type === "venda") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='space-between' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.tipo}</Typography>
                                <Typography variant='body2' align='left'>{month.quantidade} paletes por {month.valor} reais</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: -20 }} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.total}</Typography>
                                <Typography variant='body2' align='right' className={classes.venda}>Venda: {month.comprador.nome}</Typography>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                <RemoveRedEye className={classes.actionArea} fontSize='medium' color='primary' onClick={() => { setMonthAtual(month); handleOpenView() }} />
                                <DeleteOutlineIcon className={classes.actionArea} fontSize='medium' color='secondary' onClick={() => handleDelete(month, "vendasRecibos")} />
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }
        })

        return (
            result
        )
    }

    function deleting(alteracao, defaults) {
        if(alteracao.id !== defaults.id)
            return alteracao
    }

    async function handleDelete(month, type) {
        const ref = doc(dataBaseApp, type, month.id);
        await deleteDoc(ref)
        alert("Deletado com sucesso");
        // let copy = [...monthsAll];
        // copy.filter(mes => deleting(mes, month))
        // console.log(copy)
        // setMonthsAll(copy);
        window.location.replace('/jm-system')
    }

    return (
        <Grid container className={classes.container} direction='row' justifyContent='center' alignItems="center">
            <Grid className={classes.paper} container direction='row' justifyContent='center' alignItems="center" spacing={5}>

                {/* card de paletes */}
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <CardActionArea className={classes.actionArea}>
                        <Card className={classes.card}>
                            <StorefrontIcon className={classes.icons} />
                            <CardContent style={{ height: '100%', width: '100%' }}>
                                <Grid container direction='row' justifyContent='space-between' alignItems="flex-start" spacing={0}>
                                    <Grid item xl={7} lg={8} md={7} sm={7} xs={7}>
                                        <Typography className={classes.text} variant="h5" component="h2" align='left'>{propsDash.main.paletesVenda} paletes</Typography>
                                        <Typography className={classes.lilText} variant="body2" component="p" align='left'>Paletes vendidos no mês</Typography>
                                    </Grid>
                                    <Grid item xl={5} lg={4} md={5} sm={5} xs={5}>
                                        <Chart options={optionsLineBt} series={propsDash.database.paletesVenda.series} type="line" width="100%" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>

                {/* card de paletes */}
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <CardActionArea className={classes.actionArea}>
                        <Card className={classes.card} style={{ backgroundColor: '#08d898' }}>
                            <AddCircleOutlineIcon className={classes.icons} />
                            <CardContent style={{ height: '100%', width: '100%' }}>
                                <Grid container direction='row' justifyContent='space-between' alignItems="flex-start" spacing={0}>
                                    <Grid item xl={7} lg={8} md={7} sm={7} xs={7}>
                                        <Typography className={classes.text} variant="h5" component="h2" align='left'>{propsDash.main.paletesCompra} paletes</Typography>
                                        <Typography className={classes.lilText} variant="body2" align='left'>Paletes comprados no mês</Typography>
                                    </Grid>
                                    <Grid item xl={5} lg={4} md={5} sm={5} xs={5}>
                                        <Chart options={optionsLineBt} series={propsDash.database.paletesCompra.series} type="line" width="100%" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>

                {/* card de lucro */}
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <CardActionArea className={classes.actionArea}>
                        <Card className={classes.card} style={{ backgroundColor: '#208ce4' }}>
                            <LocalAtmIcon className={classes.icons} />
                            <CardContent style={{ height: '100%', width: '100%' }}>
                                <Grid container direction='row' justifyContent='space-between' alignItems="flex-start" spacing={4}>
                                    <Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
                                        <Typography className={classes.text} variant="h5" component="h2" align='left'>R${propsDash.main.lucroBruto} reais</Typography>
                                        <Typography className={classes.lilText} variant="body2" component="p" align='left'>Lucro bruto do mês</Typography>
                                    </Grid>
                                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                        <Chart options={optionsLineBt} series={propsDash.database.databaseBruto.series} type="line" width="100%" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>

                {/* card lateral */}
                <Grid container style={{ marginLeft: 10, marginRight: 10 }} xl={12} lg={12} md={12} sm={12} xs={12} spacing={2}>
                    <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                        <Link style={{ textDecoration: 'none', color: '#fff', }} to='/jm-system/' refresh="true">
                            <CardActionArea className={classes.actionArea}>
                                <Card className={classes.cardRight} style={{ backgroundColor: '#08d898' }}>
                                    <CardContent className={classes.lucros}>
                                        <Grid container direction='row' justifyContent='center' alignItems="center" spacing={0}>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <Typography className={classes.text} variant="subtitle1">Cadastro</Typography>
                                                <Typography className={classes.lilText} variant="caption">Área de cadastro</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Link>
                    </Grid>
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                        <CardActionArea className={classes.actionArea}>
                            <Card className={classes.cardRight} style={{ backgroundColor: '#ffb41c' }}>
                                <CardContent className={classes.lucros}>
                                    <Grid container direction='row' justifyContent='center' alignItems="center" spacing={0}>
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <MonetizationOnIcon className={classes.lilText} style={{ fontSize: 40, marginTop: 12 }} />
                                        </Grid>
                                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                            <Typography className={classes.text} variant="subtitle1">R${propsDash.main.lucroLiq} reais</Typography>
                                            <Typography className={classes.lilText} variant="caption">Lucro líquido da empresa no mês</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                        <CardActionArea className={classes.actionArea}>
                            <Card className={classes.cardRight} style={{ backgroundColor: '#6034b4' }}>
                                <CardContent className={classes.lucros}>
                                    <Grid container direction='row' justifyContent='center' alignItems="center" spacing={0}>
                                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <MonetizationOnIcon className={classes.lilText} style={{ fontSize: 40, marginTop: 12 }} />
                                        </Grid>
                                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                            <Typography className={classes.text} variant="subtitle1">R${propsDash.main.saidasTotais} reais</Typography>
                                            <Typography className={classes.lilText} variant="caption">Despesas totais mensais</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                </Grid>

                <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                    <Box className={classes.graficoPrincipal}>
                        <Chart options={optionsLineThree} series={propsDash.database.databasePrincipal.series} type="bar" width="100%" />
                    </Box>
                </Grid>

                <Grid item className={classes.lateral} xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        {showLess && (
                            comprasEVendas(propsDash.month.slice4)
                        )}

                        {showSomething && (
                            comprasEVendas(propsDash.month.slice6)
                        )}

                        {showMore && (
                            comprasEVendas(propsDash.month.slice7)
                        )}
                        <Button onClick={handleOpen} style={{ marginTop: '1vh' }} color='primary'>
                            Ver mais
                        </Button>
                    </Grid>
                </Grid>

                <Grid item className={classes.lateral2} xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant='h5'>Total cadastrado no sistema: </Typography>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography>Lucro Total</Typography></TableCell>
                                    <TableCell><Typography>R$ {propsDash.totalGeral.lucroBruto}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography>Lucro Líquido</Typography></TableCell>
                                    <TableCell><Typography>R$ {propsDash.totalGeral.lucroLiq}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography>Paletes Comprados</Typography></TableCell>
                                    <TableCell><Typography>{propsDash.totalGeral.paletesCompra}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography>Paletes Vendidos</Typography></TableCell>
                                    <TableCell><Typography>{propsDash.totalGeral.paletesVenda}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography>Despesas</Typography></TableCell>
                                    <TableCell><Typography>R$ {propsDash.totalGeral.saidasTotais}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog className={classes.dialog} fullWidth={true} maxWidth='sm' open={openModal} onClose={handleClose}>
                <DialogTitle>Exibindo todos os acontecimentos do mês</DialogTitle>
                <DialogContent>
                    {comprasEVendas(monthsAll)}
                </DialogContent>
            </Dialog>

            <Dialog style={{ backgroundColor: '#1212' }} fullWidth={true} maxWidth='sm' open={openModalView} onClose={handleCloseView}>
                <DialogContent className={classes.dialog}>
                    {monthAtual.type === "compra" && (
                        <Typography variant='h5'>Compra: </Typography>
                    )}

                    {monthAtual.type === "despesa" && (
                        <Typography variant='h5'>Despesa: </Typography>
                    )}

                    {monthAtual.type === "venda" && (
                        <Typography variant='h5'>Venda: </Typography>
                    )}

                    {monthAtual.type === "comissao" && (
                        <Typography variant='h5'>Comissão: </Typography>
                    )}

                    <Table>
                        <TableBody>
                            {monthAtual.type === "compra" && (
                                <>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Tipo de Palete</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.tipoDePalete}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Quantidade</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.quantidade}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Valor por unidade</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.valor}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Total da compra</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.total}</Typography></TableCell>
                                    </TableRow>
                                </>
                            )}

                            {monthAtual.type === "venda" && (
                                <>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>{monthAtual.comprador.type}</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.comprador.nome}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Dados</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.comprador.dado}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Tipo de Palete</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.tipo}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Quantidade</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.quantidade}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Valor por unidade</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.valor}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Total da compra</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.total}</Typography></TableCell>
                                    </TableRow>
                                </>
                            )}

                            {monthAtual.type === "comissao" && (
                                <>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Nome do funcionario</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.funcionario.nome}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>CPF do funcionario</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.funcionario.cpf}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Quantidade</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.quantidade}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Valor por unidade</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.valor}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Total da compra</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.total}</Typography></TableCell>
                                    </TableRow>
                                </>
                            )}

                            {monthAtual.type === "despesa" && (
                                <>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Gasto</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.nomeDaDespesa}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Tipo de despesa</Typography></TableCell>
                                        <TableCell><Typography>{monthAtual.tipoDeDespesa}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography className={classes.nomeDestaque}>Valor da despesa</Typography></TableCell>
                                        <TableCell><Typography>R$ {monthAtual.valor}</Typography></TableCell>
                                    </TableRow>
                                </>
                            )}

                            <TableRow>
                                <TableCell><Typography className={classes.nomeDestaque}>Unidade da compra</Typography></TableCell>
                                <TableCell><Typography>{monthAtual.unidade}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography className={classes.nomeDestaque}>Data</Typography></TableCell>
                                <TableCell><Typography>{(monthAtual.data)}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}

export default MainDashboard;