import cron from 'node-cron';
import http from 'http';
import https from 'https';

export default class Schedule{
    constructor(date, emplController){
        this.$http = http;
        this.employees = [];
        this.emplController = emplController;
        this._day = date.getUTCFullYear();
        this._month = date.getUTCMonth() + 1;
        this._day = date.getUTCDate();
    }

    getBirthdateSchedule() {
        const sche = `00 00 11 * * *`; 
        const task = cron.schedule(sche, () => {
             this.emplController.getBirthdayList().then((empl) => {
                if (empl.length > 0) {
                    this.getData().then(({status, data}) => {
                        console.log(data);
                    }, (error) => {
                        next(error);
                    });
                } else {
                    console.log('nothing');
                }
            });
        });
        return task;
    }

    //GET https://172.21.19.25/api/v1/consumers/{:CONSUMER_API_KEY}/
    //actions/EXTERNAL_APP?&appId=5cb78fa7a3800c0012d5f83f&maxInterruptTime=100&targetId={:targetId}
    getData() {
        /*const options = {
            host: '172.21.19.25',
            port: '443',
            path: '/api/v1/consumers/{:CONSUMER_API_KEY}/actions/EXTERNAL_APP?&appId=5cb78fa7a3800c0012d5f83f&maxInterruptTime=100&targetId={:targetId}',
            method: 'GET'
        };*/
        const options = {
            host: '172.21.19.100',
            port: '3000',
            path: '/crud/employees',
            method: 'GET'
        };
        return new Promise((resolve, reject) => {
            //let req = https.request(options, (res) => {
            let req = http.request(options, (res) => {
                let output = '';
                console.log('rest::', options.host + ':' + res.statusCode);
                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    output += chunk;
                });

                res.on('end', () => {
                    try {
                        let obj = JSON.parse(output);
                        resolve({
                            statusCode: res.statusCode,
                            data: obj
                        });
                    }
                    catch(err) {
                        console.error('rest::end', err);
                        reject(err);
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
