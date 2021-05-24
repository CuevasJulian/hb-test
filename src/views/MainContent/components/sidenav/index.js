import React, { useContext } from 'react';
import { Row,Col,Layout,Menu } from 'antd';
import {
    UserOutlined,
    FolderOutlined,
    StarOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { ContextApp } from '@context';

import './style.scss';

const { Header,Content } = Layout;
const SideNav = ( { pathMatch = '' } ) => {

    const history = useHistory();
    const contextApp = useContext(ContextApp);
    const { dataApp } = contextApp;

    return(
        <Layout className={'container-sidenav'}>
            <Header className={'top-nav'}>
                <p>Hello! <strong>{dataApp.user.email}</strong></p>
            </Header>
            <Content>
                <Menu className={'menu-nav'}>
                    <Menu.Item onClick={() => history.replace(`${pathMatch}/profile`)} icon={<UserOutlined />}>
                        My Profile
                    </Menu.Item>
                    <Menu.Item onClick={() => history.replace(`${pathMatch}/repos`)} icon={<FolderOutlined />}>
                        Repositories
                    </Menu.Item>
                    <Menu.Item onClick={() => history.replace(`${pathMatch}/favs`)} icon={<StarOutlined />}>
                        {
                            `My favorites (${dataApp.repoFav.length})`
                        }
                    </Menu.Item>
                </Menu>
            </Content>
        </Layout>
    );
}

export default SideNav;