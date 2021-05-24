import React,{ useContext } from 'react';
import { Row , Col,Card } from 'antd';
import { ContextApp } from '@context';
import './style.scss';

const Profile = () => {
    const contextApp = useContext(ContextApp);
    const { dataApp,setDataApp } = contextApp;
    return (
        <Row className={'container-profile'}>
            <Col span={24}>
                <Card>
                    <Row>
                        <Col span={24}>
                            Profile
                        </Col>
                        <Col span={24}>
                            <p>Email: <strong>{dataApp.user.email}</strong></p>
                        </Col>    
                    </Row>        
                </Card>
            </Col>
            
        </Row>
    )
}

export default Profile;