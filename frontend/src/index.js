import 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-aria';
import './app/components/users/list_users/list.users.controller';

angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'list.users.controllers'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            template: require('./app/components/users/list_users/list.users.view.html'),
            controller: 'ListUsersController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

