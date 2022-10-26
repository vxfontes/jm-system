import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CompraPalete from './pages/despesa';
import Despesas from './pages/despesa/despesas';
import Home from './pages/home';
import ReciboComissao from './pages/reciboComissao';
import ReciboCliente from './pages/reciboVendas/Cliente';
import ReciboEmpresa from './pages/reciboVendas/Empresa';



const RoutesComp = () => {

    return (
        <Router>
            <Routes>
                <Route exact path="/jm-system" element={<Home />} />
                <Route exact path="/jm-system/comissao" element={<ReciboComissao />} />
                <Route exact path="/jm-system/empresa" element={<ReciboEmpresa />} />
                <Route exact path="/jm-system/cliente" element={<ReciboCliente />} />
                <Route exact path="/jm-system/comprovante" element={<CompraPalete />} />
                <Route exact path="/jm-system/despesas" element={<Despesas />} />
                <Route exact path="/jm-system/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default RoutesComp;