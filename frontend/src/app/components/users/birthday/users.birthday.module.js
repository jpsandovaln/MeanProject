import BirthdayController from './users.birthday.controller';
import ImageInterval from './image.interval.directive';

const birthdayModule = angular.module('user.birthday.controllers', [
]);

birthdayModule.controller('UserBirthdayController', BirthdayController);
birthdayModule.directive('imageInterval', ImageInterval);

export default birthdayModule;
