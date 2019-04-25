import mongoose from 'mongoose'; 
import config from '../config/environment';
import message from '../commons/constants/messages';

export default class DataBaseConnection {

    constructor() {
        this.URI = `${config.uri}${config.db}`;
    }
    
    getDataBaseConnection() {
        mongoose.connect(this.URI)
            .then(db => console.log(message.dbConnected))
            .catch(err => console.log(err));
        return mongoose;
    }
}
