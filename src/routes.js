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
                <Route exact path="/" component={Home} />
                <Route exact path="/comissao" component={ReciboComissao} />
                <Route exact path="/empresa" component={ReciboEmpresa} />
                <Route exact path="/cliente" component={ReciboCliente} />
                <Route exact path="/comprovante" component={CompraPalete} />
                <Route exact path="/despesas" component={Despesas} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default RoutesComp;