const { alias } = require('react-app-rewire-alias');


module.exports = override = ( config ) => {
    alias({
        '@views':'src/views',
        '@components':'src/components',
        '@context':'src/context',
        '@services':'src/services',
    })(config);

    return config
}