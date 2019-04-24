
export const routes = ($routeProvider)  => { 
    'ngInject';
    $routeProvider
    .when("/", {
        template: require("./app/components/users/list_users/list.users.view.html"),
        controller: "ListUsersController",
        controllerAs: "userCtrl"
    })
    .when("/birthday", {
        template: require("./app/components/users/birthday/users.birthday.view.html"),
        controller: "BirthdayController",
        controllerAs: "birthdayCtrl"
    })
    .when("/birthday/:id", {
        template: require("./app/components/users/birthday/users.birthday.view.html"),
        controller: "UserBirthdayController"
    })
    .otherwise({
        redirectTo: "/"
    });
}
  