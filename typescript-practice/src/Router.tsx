import React from 'react';
import WriteCard from './components/templates/WriteCard'
import Home from './pages/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/write" component={WriteCard}/>

        </Switch>
        </BrowserRouter>
    );
};

export default Router;