import React, { useEffect,useContext } from 'react';
import { Button, Layout } from 'antd';
import { SideNav,Profile,Repositories,Favorites } from './components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation,
    useRouteMatch
  } from "react-router-dom";
import { ContextApp } from '@context';
import './style.scss';

const { Header,Content,Footer,Sider } = Layout;

const MainContent = () => {
    const contextApp = useContext(ContextApp);
    const { dataApp,setDataApp,logout } = contextApp;
    const match = useRouteMatch();

    return(
        <Layout className={'container-main-layout'}>
            <Sider>
                <SideNav pathMatch={match.url} />                
            </Sider>
            <Layout>
                <Header className={'container-header'}><Button type={'link'} onClick={logout}>Logout</Button></Header>
                <Content>
                    <Switch>
                        <Route path={`${match.url}/profile`} component={Profile}/>
                        <Route path={`${match.url}/repos`} component={Repositories}/>
                        <Route path={`${match.url}/favs`} component={Favorites}/>
                        <Redirect to={`${match.url}/profile`} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainContent;