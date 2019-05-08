import express from 'express';
import EmployeeController from '../controllers/employee.controller';

/**
 * Class to define the routes used.
 */
export default class EmployeeRoute {
    constructor() {
        'ngInject';
        this.router = express.Router();
        this.employeeController = new EmployeeController();
        this.setRoutes();
    }

    /**
     * Set all routes.
     */
    setRoutes() {
        this.router.get('/', this.employeeController.getAllEmployees());
        this.router.get('/birthdaylist/', this.employeeController.getAllEmployeesInBirthday());
        this.router.get('/:id', this.employeeController.getEmployee());
        this.router.post('/', this.employeeController.uploadSingle(), this.employeeController.createEmployee());
        this.router.delete('/:id', this.employeeController.deleteEmployee());
        this.router.put('/:id', this.employeeController.uploadSingle(), this.employeeController.editEmployee());
    }

    /**
     * Get all routes.
     * @returns {Router} the routes to the application.
     */
    getRoutes() {
        return this.router;
    }
}
