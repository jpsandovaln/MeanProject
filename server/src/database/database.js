import mongoose from 'mongoose'; 

export default class DataBaseConnection {

    constructor() {
        this.URI = 'mongodb://localhost/db-crud-emp-birth';
    }
    
    getDataBaseConnection() {
        mongoose.connect(this.URI)
            .then(db => console.log('DB is connected'))
            .catch(err => console.log(err));
        return mongoose;
    }
}
