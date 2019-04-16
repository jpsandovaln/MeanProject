import 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-aria';
import './app/components/users/list_users/list.users.controller';
//import './app/components/users/birthday/users.birthday.controller';
//import './app/components/users/new_users/new.users.controller';

angular.module('app', [
        'ngRoute',
        'list.users.controllers',
        //'intervalExample'
        //'user.birthday.controllers'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            template: require('./app/components/users/list_users/list.users.view.html'),
            controller: 'ListUsersController'
        //}).when('/birthday/', {
         //   template: require('./app/components/users/new_users/new.users.view.html'),
        
        //}).when('/birthday/:employee_name', {
        //    template: require('./app/components/users/birthday/users.birthday.view.html'),
        //    controller: 'userBirthdayController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

