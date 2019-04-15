import 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-aria';
import './app/components/users/list_users/list.users.controller';
import './app/components/users/birthday/users.birthday.controller';

angular.module('app', [
        'ngRoute',
        'list.users.controllers',
        'user.birthday.controllers'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            template: require('./app/components/users/list_users/list.users.view.html'),
            controller: 'ListUsersController'
        }).when('/birthday/:employee_name', {
            template: require('./app/components/users/birthday/users.birthday.view.html'),
            controller: 'userBirthdayController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

