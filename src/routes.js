import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {Context} from './Context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import Cartoes from './pages/cartoes';
import Compras from './pages/compras'; 
import novoCartao from './pages/novoCartao';
import editaCartao from './pages/editaCartao';
import novaCompra from './pages/novaCompra';
import editaCompra from './pages/editaCompra';

function CustomRoute ({isPrivate, ...rest}){
    const {authenticated} = useContext(Context);
    if(isPrivate && !authenticated){
        return <Redirect to='/'/>
    }

    return <Route {...rest}/>;
}

export default function Routes(){
    return (
            <Switch>
                <CustomRoute path="/" exact component={Login}/>
                <CustomRoute path="/register" exact component={Register}/>
                <CustomRoute isPrivate path="/profile" exact component={Profile}/>
                <CustomRoute isPrivate path="/profile/cartoes" exact component={Cartoes}/>
                <CustomRoute isPrivate path="/profile/cartoes/novoCartao" exact component={novoCartao}/>
                <CustomRoute isPrivate path="/profile/cartoes/editaCartao" exact component={editaCartao}/>
                <CustomRoute isPrivate path="/profile/compras" exact component={Compras}/>
                <CustomRoute isPrivate path="/profile/compras/novaCompra" exact component={novaCompra}/>
                <CustomRoute isPrivate path="/profile/compras/editaCompra" exact component={editaCompra}/>
            </Switch>
    );
}
