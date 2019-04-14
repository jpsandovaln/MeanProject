import 'angular';
import 'angular-material';
import 'angular-aria';
import $ from "jquery";

const module = angular.module('list.users.controllers', ['ngMaterial'])
    .controller('ListUsersController', ['$scope', '$http', function($scope, $http) {
        $http({
            method: 'get', 
            url: 'http://localhost:3000/crud/employees'
        }).then(function (response) {
            console.log(response, 'res');
            $scope.employees = response.data;
        },function (error){
            console.log(error, 'can not get data.');
        });
    }])
    .directive('apsUploadFile', apsUploadFile);

function apsUploadFile() {
  var directive = {
    restrict: 'E',
    template: '<input id="fileInput" type="file" class="ng-hide"> <md-button id="uploadButton" class="md-raised md-primary" aria-label="attach_file">    Choose image file </md-button><md-input-container  md-no-float flex="50">    <input id="textInput" ng-model="fileName" type="text" placeholder="No file chosen" ng-readonly="true"></md-input-container>',
    link: apsUploadFileLink
  };
  return directive;
}

function apsUploadFileLink(scope, element, attrs) {
  var input = $(element[0].querySelector('#fileInput'));
  var button = $(element[0].querySelector('#uploadButton'));
  var textInput = $(element[0].querySelector('#textInput'));

  if (input.length && button.length && textInput.length) {
    button.click(function(e) {
      input.click();
    });
    textInput.click(function(e) {
      input.click();
    });
  }

  input.on('change', function(e) {
    var files = e.target.files;
    if (files[0]) {
      scope.fileName = files[0].name;
    } else {
      scope.fileName = null;
    }
    scope.$apply();
  });
}

export default module;
