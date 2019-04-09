const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');

const employeeController = new EmployeeController();

router.get('/', employeeController.getAllEmployees());
router.get('/:id', employeeController.getEmployee());
router.post('/', employeeController.uploadSingle(), employeeController.createEmployee());
router.delete('/:id', employeeController.deleteEmployee());
router.put('/:id', employeeController.uploadSingle(), employeeController.editEmployee());

module.exports = router;