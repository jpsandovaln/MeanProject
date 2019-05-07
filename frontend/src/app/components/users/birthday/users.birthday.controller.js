
import config from '../../../../config/environment';

/**
 * Controller for Birthday
 */
export default class BirthdayController {
    constructor($interval, $http, $routeParams) {
        'ngInject';
        this.$interval = $interval;
        this.$http = $http;
        this.$routeParams = $routeParams;
        this.employee_id = this.$routeParams.id;
        this.employee_firstName = this.$routeParams.firstName;
        this.employee_lastName = this.$routeParams.lastName;
        this.employee_photoUrl = this.$routeParams.photoUrl;
        this.employees = [];
        this.baseUri = `http://${config.serverHost}:${config.serverPort}`;
        this.employeeRoute = `${this.baseUri}/crud/employees`;
        if (this.employee_id === undefined || this.employee_id === null) {
            if (this.employee_firstName === undefined && this.employee_lastName === undefined && this.employee_photoUrl  === undefined) {
                this.urlBirthday = `${this.employeeRoute}/birthdaylist`;
                this.getBirthdayList();
            } else {
                this.employee_name = this.employee_firstName + ' ' + this.employee_lastName;
                this.baseUri = "";
                this.employeeImg = this.employee_photoUrl;
            }
        } else {
            this.urlBirthday = `${this.employeeRoute}/${this.employee_id}`;   
            this.getBirthdayList();
        }
    }

    /**
     * Method to get the employee's list. 
     */
    getBirthdayList() {
        this.$http({
            method: 'get', 
            url: this.urlBirthday
        }).then((response) => {
            this.employeeImg = this.defaultImg;
            if (Array.isArray(response.data) && response.data.length > 0) {
                this.employees = response.data;
                let index = this.employees.length - 1;
                this.employee_name = this.employees[index].firstName + ' ' + this.employees[index].lastName;
                this.employeeImg = this.employees[index].image;
            } else {
                if (Object.keys(response.data).length > 0) {
                    this.employee = response.data;
                    this.employee_name = this.employee.firstName + ' ' + this.employee.lastName;
                    this.employeeImg = this.employee.image;
                } else {
                    this.employeeImg = this.defaultImg;
                }
            }
        }, (error) => {
            console.log(error, 'can not get data.');
        });
    }
}
