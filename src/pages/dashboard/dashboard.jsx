import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { dataBaseApp } from '../../firebase';

import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Button, Box } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
    amber,
    green,
    indigo,
    lightGreen,
    red,
} from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import useStyles from './styles';
import { GeneralGraphComponent } from './subpages/General';

const fakeArrayDataGenerator = ({ count, digit }) => {
    const array = [];
    for (let index = 0; index < count; index++) {
        const element = Math.round(Math.random() * digit);
        array.push(element);
    }
    return array;
};

const randomValueGenerator = ({ digit }) => {
    const elm = Math.round(Math.random() * digit);
    return elm;
};

const MainDashboard = () => {

    const classes = useStyles();
    const [fetched, setFetched] = useState(false);

    useEffect   (() => {
        if (!fetched) {
            GraphData.map((item) =>
                GeneralGraphComponent({
                    id: item.id,
                    type: item.type,
                    datasets: item.datasets,
                    xAxislabels: item.xAxislabels,
                })
            );
            setFetched(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetched]);

    // ordenar e armazenar tudo referente a um mes

    // mudar tudo do mes atual para o mes anterior

    // semana atual
    // setDoc(doc(dataBaseApp, "months", "mainMonth"), {
    //     name: "MUDANDO ESSA PORRA",
    //     state: "CA",
    //     country: "USA"
    // });

    // loop deletando todos os arquivos do mes ????
    // deleteDoc(doc(dataBaseApp, "cities", "LA"))

    const DisplayData = [
        {
            label: "Post",
            value: randomValueGenerator({ digit: 1000 }),
            icon: <ArrowDropUpIcon />,
            iconLabel: "4%",
        },
        {
            label: "Pages",
            value: randomValueGenerator({ digit: 100 }),
            icon: <ArrowDropUpIcon />,
            iconLabel: "9%",
        },
        {
            label: "New Visitor",
            value: randomValueGenerator({ digit: 100 }),
            icon: <ArrowDropDownIcon />,
            iconLabel: "23%",
        },
        {
            label: "Total visitor",
            value: randomValueGenerator({ digit: 1000 }),
            icon: <ArrowDropDownIcon />,
            iconLabel: "30%",
        },
    ];

    const GraphCardData = [
        {
            id: "Post",
            data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
            brColor: blue[500],
            bgColor: blue[50],
        },
        {
            id: "Pages",
            data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
            brColor: indigo[500],
            bgColor: indigo[50],
        },
        {
            id: "New Visitor",
            data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
            brColor: lightGreen[500],
            bgColor: lightGreen[50],
        },
        {
            id: "Total visitor",
            data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
            brColor: amber[500],
            bgColor: amber[50],
        },
    ];

    const GraphData = [
        {
            id: "userGraph",
            type: "line",
            datasets: [
                {
                    label: "Current Month",
                    data: fakeArrayDataGenerator({ count: 30, digit: 100 }),
                    backgroundColor: "rgba(21,101,192,0.6)",
                    borderColor: blue["A200"],
                    fill: true,
                    tension: 0.5,
                },
                {
                    label: "Last Month",
                    data: fakeArrayDataGenerator({ count: 30, digit: 100 }),
                    backgroundColor: "rgba(198,40,40,0.6)",
                    borderColor: red["A200"],
                    fill: true,
                    tension: 0.5,
                },
            ],
            xAxislabels: ["week1", "week2", "week3", "week4", "week5"],
        },
        {
            id: "userPieGraph",
            type: "pie",
            datasets: [
                {
                    label: "Current Month",
                    data: fakeArrayDataGenerator({ count: 3, digit: 1000 }),
                    backgroundColor: [blue[100], blue[200], blue[300]],
                    borderColor: blue["A200"],
                    fill: true,
                    tension: 0.5,
                },
            ],
            xAxislabels: ["Desktop", "Tablet", "Mobile"],
        },
    ];


    return (
        <>
            <Grid container spacing={1}>
                {DisplayData.map((item, i) => (
                    <Grid item xs={6} sm={3} key={i}>
                        <Card>
                            <CardContent className={classes.cardContent}>
                                <canvas
                                    id={item.label}
                                    className={classes.displayCardGraph}></canvas>

                                <Typography variant='body2' className={classes.cardLabel}>
                                    {item.label}
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h6'
                                    className={classes.cardTitle}>
                                    {item.value}
                                </Typography>
                                <Typography
                                    component='p'
                                    style={{
                                        textAlign: "center",
                                        marginBottom: "0px",
                                    }}>
                                    <Button
                                        size='small'
                                        className={classes.ratioBtn}
                                        startIcon={item.icon}
                                        style={{
                                            color: item.label[0] === "P" ? green[600] : red[500],
                                        }}>
                                        {item.iconLabel}
                                    </Button>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box className={classes.section}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5' component='h6'>
                                    User Overview
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <canvas
                                    id='userGraph'
                                    className={classes.displayUserGraph}></canvas>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5' component='h6'>
                                    Device Overview
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <canvas
                                    id='userPieGraph'
                                    className={classes.displayUserGraph}></canvas>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default MainDashboard;