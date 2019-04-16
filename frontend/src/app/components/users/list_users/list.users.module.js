
import 'angular';
import 'angular-material';
import 'angular-aria';
import $ from "jquery";
import moment from 'moment';

import ListUsersController from './list.users.controller';

const userListModule = angular.module('list.users.controllers', [
]);

userListModule.controller('ListUsersController', ListUsersController);
//userListModule.directive('apsUploadFile', ApsUploadFile);

export default userListModule;
