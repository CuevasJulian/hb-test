const base_graphql = 'https://api.github.com/graphql';
const base_rest = 'https://api.github.com/';

const Base_connection = ( {method,body,rest = true,endpoint,auth} ) => {

    const query_params = {
        method:method,
    }

    if(method != 'GET') query_params['body'] = JSON.stringify(body);

    return new Promise( (resolve,reject) => {
        fetch(rest ? `${endpoint ? base_rest+endpoint : base_rest }` : base_graphql , query_params).then( (rslt) => {
            resolve(rslt.json());
        }).catch( (err) => {
            reject(err);
        });
    });
}

export default Base_connection;