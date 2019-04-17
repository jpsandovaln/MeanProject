import 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-aria';
import './app/components/users/list_users/list.users.module';
import './app/components/users/birthday/users.birthday.module';

const appModule = angular.module(['app'], [
        'ngRoute',
        'ngMaterial',
        'list.users.controllers',
        'user.birthday.controllers'
    ]);

appModule
    .config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when('/', {
                template: require('./app/components/users/list_users/list.users.view.html'),
                controller: 'listUsersController',
                controllerAs: 'userCtrl'
            })
            .when('/birthday/', {
                template: require('./app/components/users/birthday/users.birthday.view.html'),
                controller: 'UserBirthdayController'
            })
            .when('/birthday/:id', {
                template: require('./app/components/users/birthday/users.birthday.view.html'),
                controller: 'UserBirthdayController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

