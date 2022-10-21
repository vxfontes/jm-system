import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { dataBaseApp } from '../../firebase';

const MainDashboard = () => {

    // ordenar e armazenar tudo referente a um mes

    // mudar tudo do mes atual para o mes anterior

    // semana atual
    setDoc(doc(dataBaseApp, "months", "mainMonth"), {
        name: "MUDANDO ESSA PORRA",
        state: "CA",
        country: "USA"
    });

    // loop deletando todos os arquivos do mes ????
    deleteDoc(doc(dataBaseApp, "cities", "LA"))

    return (
        <>
            
        </>
    );
}

export default MainDashboard;