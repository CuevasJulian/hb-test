import React,{ useContext,useState } from 'react';
import { Card,Row,Col,Form,Input,Button,Alert } from 'antd';
import { useHistory } from 'react-router';
import { ContextApp } from '@context';
import './style.scss';

const Signup = () => {
    const contextApp = useContext(ContextApp);
    const { signup } = contextApp;
    const history = useHistory();

    const [ alertSign, setAlertSign ] = useState({
        message:'Este usuario no existe',
        visible:false,
        type:'error',
    });

    const showAlert = ( {text,type} ) => {
        setAlertSign({
            message:text,
            visible:true,
            type:type
        })
        setTimeout(() => {
            setAlertSign({
                ...alertSign,
                visible:false,
            })
        },1000)
    }

    const onFinish = (values) => {
        signup(values).then( (rslt) => {
            console.log(rslt);
        }).catch( (e) => {
            console.log(e);
            showAlert({text:e,type:'error'})
        });
    }

    const onFinishFailed = (values) => {
        console.log(values);
    }

    return(
        <Row className={'container-signup'}>
            <Col sm={24} md={12} lg={6}>
                <Card>
                    <h2 className={'title'}>Welcome to this test!</h2>
                    <p className={'description'}>Dont worry, only local use, no one will receive your information</p>
                    <Form 
                    name={'formsingup'}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelAlign={'left'} 
                    wrapperCol={{span:16}} 
                    labelCol={{span:8}}>
                        <Form.Item 
                        name={'email'}
                        label={'Email'}
                        rules={[{required:true,message:'Required'}]}
                        >
                            <Input placeholder={'hbtest@test.com'} />
                        </Form.Item>
                        <Form.Item 
                        name={'password'}
                        label={'Password'}
                        rules={[{required:true,message:'Required'}]}
                        >
                            <Input type={'password'} placeholder={'Input your password'}/>
                        </Form.Item>
                        <Form.Item style={{width:'100%'}}>
                            <Button htmlType={'submit'}  type={'primary'} >Sign In!</Button>
                            <Button onClick={ () => history.push('login')} type={'link'} >Cancel</Button>
                        </Form.Item>
                    </Form>
                    { alertSign.visible && <Alert message={alertSign.message} type={alertSign.type}/>}
                </Card>
            </Col>
        </Row>
    );
}

export default Signup;