import 'angular';
import 'angular-material';
import 'angular-aria';

const module = angular.module('list.users.controllers', ['ngMaterial'])
    .controller('ListUsersController', ['$scope', '$http', function($scope, $http) {
        $http({
            method: 'get', 
            url: 'http://localhost:3000/crud/employees'
        }).then(function (response) {
            console.log(response, 'res');
            $scope.employees = response.data;
        },function (error){
            console.log(error, 'can not get data.');
        });
    }]);

export default module;
