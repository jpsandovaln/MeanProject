
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
        this.$scope.imgBanner = "./resources/happybanner.jpg"
        this.$scope.backgroundImg = "./resources/backgroundImg.jpg"
        this.$scope.default = "./resources/default.jpg"
        this.$scope.employee_name = $routeParams.employee_name;
    }

    $onInit() {
        this.getBirthdayList();
    }

    getBirthdayList() {
        this.$http({
            method: 'get', 
            url: this.urlBirthday
        }).then((response) => {
            if (Array.isArray(response.data) && response.data.length > 0) {
                this.$scope.employees = response.data;
                let index = this.$scope.employees.length - 1;
                this.$scope.employee_name = this.$scope.employees[index].firstName + ' ' + this.$scope.employees[index].lastName;
                this.$scope.imgEmployee = this.$scope.employees[index].image;
            } else {
                if (Object.keys(response.data).length > 0) {
                    this.$scope.employee = response.data;
                    this.$scope.employee_name = this.$scope.employee.firstName + ' ' + this.$scope.employee.lastName;
                    this.$scope.imgEmployee = this.$scope.employee.image;
                } else {
                    this.$scope.imgEmployee = this.$scope.default;
                }
            }

        }, (error) => {
            console.log(error, 'can not get data.');
        });
    }
}
