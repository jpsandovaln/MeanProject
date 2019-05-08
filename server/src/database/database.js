import mongoose from 'mongoose';
import config from '../config/environment';
import message from '../commons/constants/messages';

/**
 * Class to set the connection with the Data Base.
 */
export default class DataBaseConnection {

    constructor() {
        this.URI = `${config.uri}${config.db}`;
    }

    /**
     * Get the connection.
     * @returns{mongoose} the connection
     */
    getDataBaseConnection() {
        mongoose.connect(this.URI)
        .then(() => console.info(message.dbConnected))
        .catch((error) => console.error(error));
        return mongoose;
    }
}
