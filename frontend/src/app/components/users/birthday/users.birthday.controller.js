
import config from '../../../../config/environment';
import defaultImg from '../../../../resources/default.jpg';

/**
 * Controller for Birthday
 */
export default class BirthdayController {
    constructor($interval, $http, $routeParams) {
        'ngInject';
        this.$interval = $interval;
        this.$http = $http;
        this.$routeParams = $routeParams;
        this.employeeId = this.$routeParams.id;
        this.employeeFirstName = this.$routeParams.firstName;
        this.employeeLastName = this.$routeParams.lastName;
        this.employeePhotoUrl = this.$routeParams.photoUrl;
        this.employees = [];
        this.defaultImg = defaultImg;
        this.baseUri = `http://${config.serverHost}:${config.serverPort}`;
        this.employeeRoute = `${this.baseUri}/crud/employees`;
        if (!this.employeeId) {
            if (!this.employeeFirstName && !this.employeeLastName && !this.employeePhotoUrl) {
                this.urlBirthday = `${this.employeeRoute}/birthdaylist`;
                this.getBirthdayList();
            } else {
                this.employeeName = this.employeeFirstName + ' ' + this.employeeLastName;
                this.baseUri = "";
                this.employeeImg = this.employeePhotoUrl;
            }
        } else {
            this.urlBirthday = `${this.employeeRoute}/${this.employeeId}`;   
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
            if (Array.isArray(response.data) && response.data.length > 0) {
                this.employees = response.data;
                let index = this.employees.length - 1;
                this.employeeName = this.employees[index].firstName + ' ' + this.employees[index].lastName;
                this.employeeImg = this.employees[index].image;
                this.showEmployee();
            } else {
                if (Object.keys(response.data).length > 0) {
                    this.employee = response.data;
                    this.employeeName = this.employee.firstName + ' ' + this.employee.lastName;
                    this.employeeImg = this.employee.image;
                } else {
                    this.baseUri = "";
                    this.employeeImg = this.defaultImg;
                }
            }
        }, (error) => {
            console.error(error, 'can not get data.');
        });
    }

    /**
     * Method to show the employees list by interval.
     */
    showEmployee() {
        let index = 0; 
        if (this.employees.length > 1) {
            setInterval(() => {
                if(this.employees.length === 0) {
                    return;
                }
                const name = document.getElementById("employeeName");
                name.textContent = this.employees[index].firstName + ' ' + this.employees[index].lastName;
                const image = document.getElementById("employeeImageList");
                image.src = this.baseUri + this.employees[index].image;
                index++;
                if(index === this.employees.length) {
                    index = 0;
                }
            }, 6000);
        } else {
            return;
        } 
        
    }
}
