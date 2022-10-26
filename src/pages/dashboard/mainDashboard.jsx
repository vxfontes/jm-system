// import { Chart } from "react-google-charts";
import { Box, Card, CardActionArea, CardContent, Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import useStyles from './styles';
import Chart from "react-apexcharts";


// propsDash: {
//     main,
//     totalGeral,
//     months = [], 
//     meses = [],
//     database = {
//         databasePrincipal,
//         databaseBruto,
//         databaseLiquido,
//         saidasTotais
//     }
// }


const MainDashboard = (propsDash) => {
    const classes = useStyles();
    console.log(propsDash);

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

    function comprasEVendas() {
        const result = propsDash.month.map((month) => {

            if (month.type === "comissao") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='flex-start' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.funcionario.nome}</Typography>
                                <Typography variant='body2' align='left'>Funcionário</Typography>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.total}</Typography>
                                <Typography variant='body2' align='right' className={classes.despesa}>Despesa: comissão</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }

            if (month.type === "despesa") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='flex-start' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.nomeDaDespesa}</Typography>
                                <Typography variant='body2' align='left'>{month.tipoDeDespesa}</Typography>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.valor}</Typography>
                                <Typography variant='body2' align='right' className={classes.despesa}>Despesa: {month.unidade}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }

            if (month.type === "compra") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='flex-start' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.tipoDePalete}</Typography>
                                <Typography variant='body2' align='left'>{month.quantidade} paletes por {month.valor} reais</Typography>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.total}</Typography>
                                <Typography variant='body2' align='right' className={classes.despesa}>Compra: {month.unidade}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                )
            }

            if (month.type === "venda") {
                return (
                    <>
                        <Grid className={classes.margin} container direction='row' justifyContent='flex-start' alignItems="center" spacing={0}>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='left'>{month.tipo}</Typography>
                                <Typography variant='body2' align='left'>{month.quantidade} paletes por {month.valor} reais</Typography>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Typography variant='body1' className={classes.nomeDestaque} align='right'>R$ {month.total}</Typography>
                                <Typography variant='body2' align='right' className={classes.venda}>Venda: {month.comprador.nome}</Typography>
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

    return (
        <Grid container className={classes.container} direction='row' justifyContent='center' alignItems="center">
            <Grid className={classes.paper} container direction='row' justifyContent='center' alignItems="center" spacing={5}>

                {/* card de paletes */}
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <CardActionArea className={classes.actionArea}>
                        <Card className={classes.card}>
                            <StorefrontIcon className={classes.icons} />
                            <CardContent style={{ height: '100%', width: '100%' }}>
                                <Grid container direction='row' justifyContent='space-between' alignItems="flex-start" spacing={4}>
                                    <Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
                                        <Typography className={classes.text} variant="h5" component="h2">{propsDash.main.paletesVenda} paletes</Typography>
                                        <Typography className={classes.lilText} variant="body2" component="p">Paletes vendidos no mês</Typography>
                                    </Grid>
                                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                        <Chart options={optionsLineBt} series={propsDash.database.paletesVenda.series} type="line" width="100" />
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
                                        <Typography className={classes.text} variant="h5" component="h2">R${propsDash.main.lucroBruto} reais</Typography>
                                        <Typography className={classes.lilText} variant="body2" component="p">Lucro bruto do mês</Typography>
                                    </Grid>
                                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                        <Chart options={optionsLineBt} series={propsDash.database.databaseBruto.series} type="line" width="100" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>

                {/* card lateral */}
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Grid style={{ marginBottom: 10 }} item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <CardActionArea className={classes.actionArea}>
                            <Card className={classes.cardRight} style={{ backgroundColor: '#08d898' }}>
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

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box className={classes.graficoPrincipal}>
                        <Chart options={optionsLineThree} series={propsDash.database.databasePrincipal.series} type="bar" width="100%" />
                    </Box>
                </Grid>
                <Grid item className={classes.lateral} xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        {comprasEVendas()}
                        <Typography variant='body1' style={{ marginTop: '2vh' }}>Alterações mais recentes cadastradas</Typography>
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
        </Grid>
    );
}

export default MainDashboard;