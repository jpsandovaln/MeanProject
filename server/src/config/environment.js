const env = 'development';

const config = {
    development: {
        uploadFolder: 'uploads',
        serverPort: 3000,
        db: 'db-crud-employee-birth',
        uri: 'mongodb://localhost/',
        serverHost: 'localhost',
        cors: [
            'http://172.21.19.17:4200',
            'http://localhost:4200'
        ]
    }
};
export default config[env];
