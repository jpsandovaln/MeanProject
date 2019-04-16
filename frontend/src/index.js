import 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-aria';
//import './app/components/users/list_users/list.users.controller';
import './app/components/users/list_users/list.users.module';
//import './app/components/users/birthday/users.birthday.controller';
import './app/components/users/birthday/users.birthday.module';

const appModule = angular.module(['app'], [
        'ngRoute',
        'list.users.controllers',
        'user.birthday.controllers'
    ]);

appModule
    .config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when('/', {
                template: require('./app/components/users/list_users/list.users.view.html'),
                controller: 'ListUsersController'
            })
            .when('/birthday/', {
                template: require('./app/components/users/birthday/users.birthday.view.html'),
                controller: 'UserBirthdayController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

