const express = require('express');
const router = express.Router();
const cron = require('node-cron');

const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.uploadSingle, employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', employeeController.uploadSingle, employeeController.editEmployee);
router.delete('/:id', employeeController.deleteEmployee);

cron.schedule("*/10 * * * * *", function() {
    console.log('------------');
    employeeController.getEmployeesByBirthday().then( empList => {
        console.log('List of birtday = ' + empList);
    });

});

module.exports = router;