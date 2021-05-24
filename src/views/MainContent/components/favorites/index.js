import React,{ useContext, useState } from 'react';
import { Card,Row,Col,Select, Spin, Empty } from 'antd';
import { UIRepository } from '@components';
import { ContextApp } from '@context';
import './style.scss';

const Favorites = () => {
    const contextApp = useContext(ContextApp);
    const { dataApp,setDataApp } = contextApp;
    const { Option } = Select;

    const [ repositories, setRepositories ] = useState({
        list_type:'list',
    });

    return (
        <Row className={'container-favs'}>
            <Col span={24}>
                <Card className={'container-list'}>
                    <Row gutter={[10,10]} className={'filters-repositories'}>
                        <Col span={24}>
                            <Select className={'list-type'} value={repositories.list_type} onChange={(e) => setRepositories({...repositories,list_type:e})}>
                                <Option value={'list'}>List</Option>
                                <Option value={'grid'}>Grid</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[10,10]} className={'list-repositories'}>
                        {
                            dataApp.repoFav.length == 0 ? <Empty /> :
                            dataApp.repoFav.map( (item,i) => (
                                <Col key={i} span={repositories.list_type == 'grid' ? 8 : 24}>
                                    <UIRepository  name={item.name} owner_name={item.owner_name} url_image={item.url_image} />
                                </Col>
                            ))
                        }
                    </Row>
                </Card> 
            </Col>
        </Row>
    )
}

export default Favorites;