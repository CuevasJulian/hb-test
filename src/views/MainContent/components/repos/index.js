import React, { useEffect, useState } from 'react';
import { Card,Row,Col,Select, Spin, Radio } from 'antd';
import { QueryUser } from '@services';
import { UIRepository } from '@components';
import './style.scss';

const { Option } = Select;
const { get_user_repo,get_public_repos } = QueryUser;

const Repositories = () => {


    const [ repositories, setRepositories ] = useState({
        data:[],
        loading:false,
        list_type:'list',
        repo_url:'public',
    });


    const getPublicRepos = () => {
        setRepositories({
            ...repositories,
            loading:true,
        })
        get_public_repos().then((rslt) => {
            setRepositories({
                ...repositories,
                loading:false,
                data:rslt
            });
        }).catch( (err) => {
            console.log(err);
            setRepositories({
                ...repositories,
                loading:false,
            })
        });
    }

    const getPrivateRepo = () => {
        setRepositories({
            ...repositories,
            data:[]
        })
    }

    const requestRepos = () => {
        switch(repositories.repo_url){
            case 'public':
                getPublicRepos();
            break;
            case 'private':
                getPrivateRepo();
            break;
        }
    }

    useEffect( () => {
        requestRepos();
    },[]);

    useEffect( () => {
        requestRepos();
    },[repositories.repo_url]);

    return (
        <Row className={'container-repos'}>
            <Col span={24}>
                <Card className={'container-list'}>
                    <Row gutter={[10,10]} className={'filters-repositories'}>
                        <Col span={24}>
                            <Select className={'list-type'} value={repositories.list_type} onChange={(e) => setRepositories({...repositories,list_type:e})}>
                                <Option value={'list'}>List</Option>
                                <Option value={'grid'}>Grid</Option>
                            </Select>

                            <Radio.Group 
                            options={[
                                {
                                    label:'Public Github',
                                    value:'public'
                                },
                                {
                                    label:'Private (Require Login)',
                                    value:'private',
                                    disabled: true
                                }
                            ]}
                            value={repositories.repo_url}
                            onChange={(e) =>  setRepositories({...repositories,repo_url:e.target.value})}/>
                        </Col>
                    </Row>
                    <Row gutter={[10,10]} className={'list-repositories'}>
                        <Spin className={'spin-loading'} spinning={repositories.loading} />
                        {
                            repositories.data.map( (item,i) => (
                                <Col key={i} span={repositories.list_type == 'grid' ? 8 : 24}>
                                    <UIRepository  name={item.name} owner_name={item.owner.login} url_image={item.owner.avatar_url} />
                                </Col>
                            ))
                        }
                    </Row>
                </Card> 
            </Col>
        </Row>
    )
}

export default Repositories;