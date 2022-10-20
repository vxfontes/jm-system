import { collection, addDoc, getDocs } from 'firebase/firestore'
import { dataBaseApp } from "../../firebase";

const Dashboard = () => {
    const refTabela = collection(dataBaseApp, "vendasRecibos")

    useEffect(() => {
        const getVendas = async () => {
            const data = await getDocs(refTabela);
            console.log(data);
        };

        getVendas();
    }, []);
}

export default Dashboard;