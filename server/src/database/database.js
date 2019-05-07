import mongoose from 'mongoose';
import config from '../config/environment';
import message from '../commons/constants/messages';

export default class DataBaseConnection {

    constructor() {
        this.URI = `${config.uri}${config.db}`;
    }

    getDataBaseConnection() {
        mongoose.connect(this.URI)
        .then(() => console.info(message.dbConnected))
        .catch((error) => console.error(error));
        return mongoose;
    }
}
