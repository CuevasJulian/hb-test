import React, { useState,useContext } from 'react';
import { Card,Row,Col,Form,Input,Button,Alert } from 'antd';
import { useHistory } from 'react-router';
import { ContextApp } from '@context';
import './style.scss';

const Login = () => {
    const contextApp = useContext(ContextApp);
    const { login } = contextApp;
    const history = useHistory();
    const [ alertLogin, setAlertLogin ] = useState({
        message:'Este usuario no existe',
        visible:false,
        type:'error',
    });

    const showAlert = ( {text,type} ) => {
        setAlertLogin({
            message:text,
            visible:true,
            type:type
        })
        setTimeout(() => {
            setAlertLogin({
                ...alertLogin,
                visible:false,
            })
        },1000)
    }

    const onFinish = ( values ) => {
        console.log(values);
        login(values).then( (rslt) => {

        }).catch( (err) => {
            showAlert({
                text:err,
                type:"error"
            });
        });
        
    }

    const onFinishFailed = ( values ) => {

    }

    return(
        <Row className={'container-login'}>
            <Col>
                <Card className={'form-basics'}>
                    <h2>HB Test</h2>
                    <Form 
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelAlign={'left'} 
                    wrapperCol={{span:16}} 
                    labelCol={{span:8}}>
                        <Form.Item 
                        name={'email'}
                        label={'Email'}
                        rules={[{required:true,message:'Required'}]}>
                            <Input placeholder={'hbtest@test.com'} />
                        </Form.Item>
                        <Form.Item 
                        name={'password'}
                        label={'Password'}
                        rules={[{required:true,message:'Required'}]}>
                            <Input type={'password'} placeholder={'Input your password'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={'submit'} type={'primary'} >Login</Button>
                            <Button onClick={ () => history.push('signup') } type={'link'} >Singup</Button>
                        </Form.Item>
                    </Form>
                    {
                        alertLogin.visible && <Alert type={alertLogin.type} message={alertLogin.message} />
                    }
                    
                </Card>
            </Col>
        </Row>
    );
}

export default Login;