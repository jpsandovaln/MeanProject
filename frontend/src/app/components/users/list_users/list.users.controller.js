import 'angular';
import 'angular-material';
import 'angular-aria';
import $ from "jquery";
import moment from 'moment';


const module = angular.module('list.users.controllers', ['ngMaterial'])
    .controller('ListUsersController', ['$scope', '$http', function($scope, $http) {
        $scope.employees = [];
        $http({
            method: 'get', 
            url: 'http://localhost:3000/crud/employees'
        }).then(function (response) {
            console.log(response, 'res');
            $scope.employees = response.data;
        },function (error){
            console.log(error, 'can not get data.');
        });

        $scope.addEmployee = function() {
            const fd = new FormData();
            fd.append('imageUpload', $scope.selectedFile);
            fd.append('firstName', $scope.firstName);
            fd.append('lastName', $scope.lastName);
            fd.append('age', $scope.age);   
            fd.append('birthdate', moment($scope.birthdate).format("YYYY-MM-DD"));   

            console.log(fd);
            $http({
                method: 'post', 
                url: 'http://localhost:3000/crud/employees',
                headers: { 'Content-Type': undefined },
                data: fd
            }).then(function (response) {
                $scope.employees.push(fd);
                $scope.clearModel();
            },function (error){
                console.log(error, 'can not add data.');
            });

        };

        $scope.deleteEmployee = function (employee) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/crud/employees/' + employee._id
            })
            .then(function(response) {
                const index = $scope.employees.indexOf(employee);
                $scope.employees.splice(index, 1);
            }, function(rejection) {
                console.log(rejection.data);
            });
            
        };

        $scope.clearModel = function () {
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.age = '';
            $scope.birthdate = '';
            $scope.fileName = '';
        };
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
      scope.selectedFile = files[0];
      console.log(scope.selectedFile);
      scope.fileName = files[0].name;
    } else {
      scope.fileName = null;
    }
    scope.$apply();
  });
}

export default module;
