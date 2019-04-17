import express from 'express';
import EmployeeController from '../controllers/employee.controller';
import cron from 'node-cron';

const router = express.Router();

const employeeController = new EmployeeController();

router.get('/', employeeController.getAllEmployees());
router.get('/birthdaylist/', employeeController.getAllEmployeesInBirthday());
router.get('/:id', employeeController.getEmployee());
router.post('/', employeeController.uploadSingle(), employeeController.createEmployee());
router.delete('/:id', employeeController.deleteEmployee());
router.put('/:id', employeeController.uploadSingle(), employeeController.editEmployee());

const sche = `00 00 11 * * *`; 
const task = cron.schedule(sche, () => {
    employeeController.getBirthdayList().then((empl) => {
        if (empl.length) {
            console.log(`Birthday = we have ${empl.length} employees`);
            console.log('http://172.21.19.17:4200/#!/birthday/');
        } else {
            console.log('nothing');
        }
    });
});
task.start();

module.exports = router;
