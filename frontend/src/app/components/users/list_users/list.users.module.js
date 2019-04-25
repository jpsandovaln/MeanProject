import ListUsersController from './list.users.controller';
import ApsUploadFile from './upload.file.directive';

const userListModule = angular.module('list.users.controllers', []);

userListModule.controller('ListUsersController', ListUsersController);
userListModule.directive('apsUploadFile', ApsUploadFile);

export default userListModule;
