
import config from '../../../../config/environment';

export default class BirthdayController {
    constructor($scope, $interval, $http, $routeParams) {
        this.$scope = $scope;
        this.$interval = $interval;
        this.$http = $http;
        this.$routeParams = $routeParams;
        this.employee_id = this.$routeParams.id;
        this.$scope.employees = [];
        this.serverUri = `http://${config.serverHost}:${config.serverPort}/crud/employees`;
        if (this.employee_id === undefined || this.employee_id === null) {
            this.urlBirthday = `${this.serverUri}/birthdaylist`;
        } else {
            this.urlBirthday = `${this.serverUri}/${this.employee_id}`;
        }

        console.log(this.urlBirthday);
        this.getBirthdayList();
        this.$scope.imgBanner = "./resources/happybanner.jpg"
        this.$scope.backgroundImg = "./resources/backgroundImg.jpg"
        this.$scope.default = "./resources/default.jpg"
        this.$scope.employee_name = $routeParams.employee_name;
    }

    getBirthdayList() {
        this.$http({
            method: 'get', 
            url: this.urlBirthday
        }).then( (response) => {
            console.log(response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
                this.$scope.employees = response.data;
                let index = this.$scope.employees.length - 1;
                this.$scope.employee_name = this.$scope.employees[index].firstName + ' ' + this.$scope.employees[index].lastName;
                this.$scope.imgEmployee = this.$scope.employees[index].image;
            } else {
                console.log(Object.keys(response.data).length);
                if (Object.keys(response.data).length > 0) {
                    this.$scope.employee = response.data;
                    this.$scope.employee_name = this.$scope.employee.firstName + ' ' + this.$scope.employee.lastName;
                    this.$scope.imgEmployee = this.$scope.employee.image;
                } else {
                    this.$scope.imgEmployee = this.$scope.default;
                }
            }

        }, function (error) {
            console.log(error, 'can not get data.');
        });
    }
}
