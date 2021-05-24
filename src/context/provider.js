import React, { useEffect, useState } from 'react';
import { ContextApp } from './'



const ContextProvider = ( {children} ) => {

    /**
     * user:{
            email:'tester'
        }
     */

    const [ dataApp, setDataApp ] = useState({
        user:null,
        repoFav:[],
    });

    useEffect( () => {
        console.log(dataApp);
    },[dataApp]);

    const logout = () => {
        setDataApp({
            ...dataApp,
            user:null,
        })
    }

    const login = ({email,password}) => {
        const accounts = get_local_accounts();

        console.log(accounts);
        return new Promise( (resolve,reject) => {
            let item = accounts.filter((item) => item.email == email && item.password == password)[0];

            if(item){
                let repositories = getReposLocal();
                console.log(repositories);
                setDataApp({
                    ...dataApp,
                    repoFav:repositories[`${item.email}`] ? repositories[`${item.email}`] : [],
                    user:item
                })
                resolve(item)
            }else{
                reject('User doesnt exist');
            }
        });
    }

    const get_local_accounts = () => {
        if(!localStorage.getItem('accounts')) localStorage.setItem('accounts',JSON.stringify([]));
        return JSON.parse(localStorage.getItem('accounts'));
    }

    const signup = ({email,password}) => {
        const accounts = get_local_accounts();

        console.log(accounts);
        return new Promise( (resolve,reject) => {
            let item = accounts.filter((item) => item.email == email)[0];

            if(item){
                reject('Email already exist')
            }else{
                let newUser = {
                    email:email,
                    password:password
                }
                accounts.push(newUser);
                setDataApp({
                    ...dataApp,
                    user:newUser
                })
                localStorage.setItem('accounts',JSON.stringify(accounts));
                resolve(newUser)
            }
        });
    }

    const getReposLocal = () => {
        if(!localStorage.getItem('repositories')) localStorage.setItem('repositories',JSON.stringify({}));
        return JSON.parse(localStorage.getItem('repositories'));
    }

    const addRepoFav = (favTemp,data) => {
        if(favTemp){ 
            if(dataApp.repoFav.filter((item)=> item.name == data.repo.name).length == 0){
                dataApp.repoFav.push(data.repo);
            } 
        }else{
            for(let i = 0 ; i < dataApp.repoFav.length ; i++){
                const temp = dataApp.repoFav[i];
                if(temp.name == data.repo.name){
                    dataApp.repoFav.splice(i,1);
                    break;
                }
            }
            
        }
        
        setDataApp({
            ...dataApp,
            repoFav:dataApp.repoFav
        })



        let repositories = getReposLocal();
        repositories[`${dataApp.user.email}`] = [...dataApp.repoFav];
        localStorage.setItem('repositories',JSON.stringify(repositories));

    }

    return(
        <ContextApp.Provider value={
            {
                dataApp:dataApp,
                setDataApp:setDataApp,
                logout:logout,
                signup:signup,
                login:login,
                addRepoFav:addRepoFav
            }
        }>
            {children}
        </ContextApp.Provider>
    )
}

export default ContextProvider;