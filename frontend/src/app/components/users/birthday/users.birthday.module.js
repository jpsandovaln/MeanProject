import BirthdayController from './users.birthday.controller';

const birthdayModule = angular.module('user.birthday.controllers', [
]);

birthdayModule.controller('BirthdayController', BirthdayController);

export default birthdayModule;
