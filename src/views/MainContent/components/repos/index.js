import React, { useEffect, useState } from 'react';
import { Card,Row,Col,Select, Spin, Radio,Input } from 'antd';
import { QueryUser } from '@services';
import { UIRepository } from '@components';
import './style.scss';

const { Option } = Select;
const { get_user_repo,get_public_repos } = QueryUser;

const Repositories = () => {


    const [ repositories, setRepositories ] = useState({
        data:[],
        loading:false,
        search:'',
        list_type:'list',
        repo_url:'public',
    });


    const getPublicRepos = () => {
        setRepositories({
            ...repositories,
            loading:true,
        })
        get_public_repos().then((rslt) => {
            console.log(rslt)
            if(rslt.message) return ;
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

                            <Input className={'input-search'} value={repositories.search} onChange={(e) => setRepositories({...repositories,search:e.target.value})}  placeholder={'Search repository'}/>

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
                    <Row  className={'list-repositories'}>
                        <Spin className={'spin-loading'} spinning={repositories.loading} />
                        <Col span={24}>
                            <Row className={'repo-grid'} gutter={[10,10]}>
                                {
                                    repositories.data.filter((e) => `${e.name}`.includes(repositories.search) ).map( (item,i) => (
                                        <Col key={i} span={repositories.list_type == 'grid' ? 8 : 24}>
                                            <UIRepository html_url={item.html_url}  name={item.name} owner_name={item.owner.login} url_image={item.owner.avatar_url} />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                        
                    </Row>
                </Card> 
            </Col>
        </Row>
    )
}

export default Repositories;