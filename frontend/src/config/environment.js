const env = 'development';

const config = {
    development: {
        serverPort: 3000,
        serverHost: '172.21.19.100',
    }
};
export default config[env];
