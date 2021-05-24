const query_repos = ( {username} ) => {
    return `
        query{
            user(name:${username}){
                name
            }
        }
    `;
}


export default { query_repos };