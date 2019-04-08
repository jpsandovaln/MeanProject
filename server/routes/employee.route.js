const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.uploadSingle, employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', employeeController.uploadSingle, employeeController.editEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;