import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CompraPalete from './pages/despesa';
import Despesas from './pages/despesa/despesas';
import Home from './pages/home';
import ReciboComissao from './pages/reciboComissao';
import ReciboCliente from './pages/reciboVendas/Cliente';
import ReciboEmpresa from './pages/reciboVendas/Empresa';
import { history } from './history';



const RoutesComp = () => {

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/jm-system" component={Home} />
                <Route exact path="/jm-system/comissao" component={ReciboComissao} />
                <Route exact path="/jm-system/empresa" component={ReciboEmpresa} />
                <Route exact path="/jm-system/cliente" component={ReciboCliente} />
                <Route exact path="/jm-system/comprovante" component={CompraPalete} />
                <Route exact path="/jm-system/despesas" component={Despesas} />
                <Route exact path="/jm-system/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default RoutesComp;