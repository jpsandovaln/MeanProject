angular.module('app.controllers', [
    'app.directives'
])
    .controller('EmployeeController', ['$scope', '$http', function($scope, $http){
        $http({
            method: 'GET',
            url: 'http://172.21.19.100:3000/crud/employees'
        }).then((res) => {
            console.log(res);
            $scope.employees = res.data;
        });
    }]);