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

module.exports = router;
