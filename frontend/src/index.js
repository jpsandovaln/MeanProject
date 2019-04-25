import "angular";
import "angular-route";
import "angular-material";
import "angular-aria";
import listModule from "./app/components/users/list_users/list.users.module";
import birthdayModule from "./app/components/users/birthday/users.birthday.module";
import { routes } from "./routes";

const appModule = angular.module(["app"],
  [
    "ngRoute",
    "ngMaterial",
    listModule.name,
    birthdayModule.name
  ]
);

appModule.config(routes);
