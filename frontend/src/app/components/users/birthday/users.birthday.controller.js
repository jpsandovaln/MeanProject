
export default class BirthdayController {
    constructor($scope, $interval, $http, $routeParams) {
        this.$scope = $scope;
        this.$interval = $interval;
        this.$http = $http;
        this.$routeParams = $routeParams;
        this.urlBirthday = 'http://172.21.19.100:3000/crud/employees/birthdaylist';
        this.getBirthdayList();
        this.$scope.imgBanner = "./resources/happybanner.jpg"
        this.$scope.backgroundImg = "./resources/backgroundImg.jpg"
        this.$scope.pthoto1 = "./resources/photo1.jpg"
        this.$scope.employee_name = $routeParams.employee_name;
    }

    getBirthdayList() {
        this.$http({
            method: 'get', 
            url: this.urlBirthday
        }).then( (response) => {
            this.$scope.employees = response.data;
            let index;
            if (this.$scope.employees.length > 0) {
                index = this.$scope.employees.length - 1;
            }
            this.$scope.employee_name = this.$scope.employees[index].firstName + ' ' + this.$scope.employees[index].lastName;
            this.$scope.imgEmployee = this.$scope.employees[index].image;
        }, function (error) {
            console.log(error, 'can not get data.');
        });
    }
}
