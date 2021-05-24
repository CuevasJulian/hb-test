import React,{ useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { Login,MainContent,Signup } from '@views'
import { ContextApp } from '@context';
import 'antd/dist/antd.css';
import './style.scss';

const Main = () => {
    const contextApp = useContext(ContextApp);
    const { dataApp,setDataApp } = contextApp;

    return(
        <Router>
            <Switch>
                {!dataApp.user && <Route exact path={['/','/login']} component={Login} />}
                {dataApp.user && <Route path={'/main'} component={MainContent}/>} 
                {!dataApp.user && <Route path={'/signup'} component={Signup}/>}
                <Redirect to={!dataApp.user ? '/login' : '/main'} /> 
            </Switch>
        </Router>
    );
}

export default Main;