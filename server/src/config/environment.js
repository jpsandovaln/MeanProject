const env = 'development';

const config = {
    development: {
        uploadFolder: 'uploads',
        serverPort: 3000,
        db: 'db-crud-employee-birth',
        uri: 'mongodb://localhost/',
        serverHost: 'localhost'
    }
};
export default config[env];
