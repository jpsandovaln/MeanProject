angular.module('app', [
    'ngRoute',
    'app.controllers'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'src/app/views/employee.view.html',
            controller:'EmployeeController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);