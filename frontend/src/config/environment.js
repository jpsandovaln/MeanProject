const env = 'development';

const config = {
    development: {
        serverPort: 3000,
        serverHost: process.env.API_HOST,
    }
};
export default config[env];
