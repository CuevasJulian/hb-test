import { BaseConnection } from './';
import { GithubQL } from './graphql';

const { query_repos } = GithubQL;

const get_user_repo = ( {username} ) => {
    return BaseConnection({
        method:'POST',
        rest:false,
        body:query_repos({username:username})
    });
}

const get_public_repos = () => {
    return BaseConnection({
        method:'GET',
        endpoint:'repositories'
    });
}

export default { 
    get_user_repo,
    get_public_repos
};