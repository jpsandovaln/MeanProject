import cron from 'node-cron';

export default class Schedule{
    constructor(date, emplController){
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
                    console.log(`Birthday = we have ${empl.length} employees`);
                    console.log('http://172.21.19.17:4200/#!/birthday/');
                } else {
                    console.log('nothing');
                }
            });
        });
        return task;
    }
}
