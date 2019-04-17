import moment from 'moment';
import config from '../../../../config/environment';

export default class ListUsersController {
    constructor($scope, $mdToast, $http){
        this.$scope = $scope;
        this.$mdToast = $mdToast;
        this.$http = $http;
        this.employees = [];
        this.$scope.selectedFile;
        this.serverUri = `http://${config.serverHost}:${config.serverPort}/crud/employees`
        this.showAllEmployee();
    }

    showAllEmployee() {
        this.$http({
            method: 'get', 
            url: this.serverUri
        }).then((response) => {
            console.log(response, 'res');
            this.employees = response.data;
        }, (error) => {
            console.log(error, 'can not get data.');
        });
    }

    addEmployee() {
        const fd = new FormData();
        fd.append('imageUpload', this.$scope.selectedFile);
        fd.append('firstName', this.firstName);
        fd.append('lastName', this.lastName);
        fd.append('age', this.age);   
        fd.append('birthdate', moment(this.birthdate).format("YYYY-MM-DD"));   
        this.$http({
            method: 'post', 
            url: this.serverUri,
            headers: { 'Content-Type': undefined },
            data: fd
        }).then((response) => {
            this.employees.push(fd);
            this.showMessage('Inserted Data.');
            this.clearModel();
            this.showAllEmployee();
        },(error) => {
            this.showMessage('can not update data.');
        });
    }

    selectedEmployee(employee) {
        this.selectedEmployee = employee;
    }

    fillData(employee) {
        const parts = employee.birthdate.split('-');
        const birthdate = new Date(parts[0], parts[1] - 1, parts[2]);
        this.selectedEmployee = employee;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.age = employee.age;
        this.birthdate = birthdate;
    }

    editEmployee() {
        const fd = new FormData(); 
        fd.append('imageUpload', this.$scope.selectedFile);
        fd.append('firstName', this.firstName);
        fd.append('lastName', this.lastName);
        fd.append('age', this.age);   
        fd.append('birthdate', moment(this.birthdate).format("YYYY-MM-DD"));   
        this.$http({
            method: 'put', 
            url: `${this.serverUri}/${this.selectedEmployee._id}`,
            headers: { 'Content-Type': undefined },
            data: fd
        }).then((response) => {
            this.clearModel();
            this.showMessage('Updated Data.');
            this.showAllEmployee();
        },(error) => {
            this.showMessage('can not update data.');
        });
    }

    deleteEmployee(employee) {
        this.$http({
            method: 'DELETE',
            url: `${this.serverUri}/${employee._id}`,
        })
        .then((response) => {
            const index = this.employees.indexOf(employee);
            this.employees.splice(index, 1);
            this.showMessage('Deleted Data.');
        }, (rejection) => {
            console.log(rejection.data);
        });   
    }

    clearModel() {
        this.firstName = '';
        this.lastName = '';
        this.age = '';
        this.birthdate = '';
        this.fileName = '';
        this.$scope.fileName = '';
    }

    showMessage(message) {
        this.$mdToast.show(
            this.$mdToast.simple()
            .textContent(message)
            .position('top')
        ); 
    }
}
