import BirthdayController from './users.birthday.controller';
import ImageInterval from './image.interval.directive';

const birthdayModule = angular.module('user.birthday.controllers', [
]);

birthdayModule.controller('BirthdayController', BirthdayController);
birthdayModule.directive('imageInterval', ImageInterval);

export default birthdayModule;
