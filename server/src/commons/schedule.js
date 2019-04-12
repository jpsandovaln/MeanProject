import cron from 'node-cron';

export default class Schedule{
    constructor(date){
        this._day = date.getUTCFullYear();
        this._month = date.getUTCMonth() + 1;
        this._day = date.getUTCDate();
    }

    getBirthdateSchedule(firsName) {
        const sche = `* * 11 ${this._day} ${this._month} * *`;
        const task = cron.schedule(sche, () => {
            console.log(`Birthday: ${firsName}`);
        }, {
            scheduled: false,
            timezone: "America/La_Paz"
        });
        return task;
    }
}
