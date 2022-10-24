import { Chart } from "react-google-charts";
import { collection, getDocs, where, query, orderBy, setDoc, doc, getDoc } from 'firebase/firestore'
import useStyles from './styles';
import { dataBaseApp } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";


const meses = collection(dataBaseApp, "months");
const total = collection(dataBaseApp, "total");

export const options = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
};


export const data = [
    ["Meses", "Lucro Líquido", "Lucro Bruto", "Todas as Despesas"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

const MainDashboard = () => {
    const classes = useStyles();
    const [month, setMonth] = useState([])


    function getMeses() {
        getDocs(meses).then((response) => {
            let datas = (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setMonth(data);
        })
    }

    useEffect(() => {
        getMeses()
    }, [])

    return (
        <>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </>
    );
}

export default MainDashboard;