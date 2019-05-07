import cron from 'node-cron';
import https from 'https';
import dotenv from 'dotenv';

/**
 * Class to tell jds to show the birthday's list
 */
export default class Schedule {
    constructor(date, emplController) {
        dotenv.config();
        this.https = https;
        this.employees = [];
        this.emplController = emplController;
        this._day = date.getUTCFullYear();
        this._month = date.getUTCMonth() + 1;
        this._day = date.getUTCDate();
    }

    /**
     * Method to config the schedule.
     * @returns {schedule} the schedule with the time to sync with JDS.
     */
    getBirthdateSchedule() {
        const sche = '00 00 11 * * *';
        const task = cron.schedule(sche, () => {
            this.emplController.getBirthdayList().then((empl) => {
                if (empl.length > 0) {
                    this.getData().then(({ data }) => {
                        console.info(data);
                    }, (error) => {
                        console.error(error);
                    });
                } else {
                    console.info('nothing');
                }
            });
        });
        return task;
    }

    /**
     * Method to do a Get request to JDS.
     * @returns {Promise} request promise.
     */
    getData() {
        const options = {
            host: process.env.JDS_HOST,
            port: process.env.JDS_PORT,
            path: `/api/v1/consumers/${process.env.CONSUMER_API_KEY}/actions/EXTERNAL_APP?&appID=${process.env.APP_ID}&maxInterruptTime=${process.env.MAX_INTERRUP_TIME}&targetId=${process.env.TARGET_ID}`,
            method: 'GET'
        };
        return new Promise((resolve, reject) => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
            const req = this.https.request(options, (res) => {
                let output = '';
                console.info('rest::', options.host + ':' + res.statusCode);
                res.setEncoding('utf8');

                res.on('data', (chunk) => {
                    output += chunk;
                });

                res.on('end', () => {
                    try {
                        const obj = JSON.parse(output);
                        resolve({
                            statusCode: res.statusCode,
                            data: obj
                        });
                    } catch (error) {
                        console.error('rest::end', error);
                        reject(error);
                    }
                });
            });
            req.on('error', (err) => {
                console.error('rest::request', err);
                reject(err);
            });
            req.end();
        });
    }
}
