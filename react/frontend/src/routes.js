import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NovoCaso from './pages/NovoCaso';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon} />
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/profile" component={Profile}/>
            <Route path ="/casos/new" component={NovoCaso}/>
        </Switch>
        </BrowserRouter>
    );
}