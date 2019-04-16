const module = angular.module('user.birthday.controllers', ['ngMaterial'])
    .controller('userBirthdayController', ['$scope', '$interval', '$http','$routeParams', function($scope, $interval, $http, $routeParams) {
        $scope.imgBanner = "../../../../resources/happybanner.jpg"
        $scope.backgroundImg = "../../../../resources/backgroundImg.jpg"
        $scope.pthoto1 = "../../../../resources/photo1.jpg"
        $scope.employee_name = $routeParams.employee_name;
        
        $http({
            method: 'get', 
            url: 'http://172.21.19.100:3000/crud/employees/birthdaylist'
        }).then(function (response) {
            console.log(response, 'res');
            $scope.employees = response.data;
            let index;
            if ($scope.employees.length > 0) {
                index = $scope.employees.length - 1;
            }
            $scope.employee_name = $scope.employees[index].firstName + ' ' + $scope.employees[index].lastName;
            $scope.imgEmployee = $scope.employees[index].image;

            console.log($scope.employees[index].image);
        }, function (error) {
            console.log(error, 'can not get data.');
        });
    }])
    .directive('myImages', ['$interval', function($interval) {
        //console.log('***' + scope.employees);
        return function(scope, element, attrs) {
            console.log(scope);
            function updateTime() {
                scope.employee_name = scope.employees[i].firstName + ' ' + scope.employees[i].lastName;
                attrs.$set('src',scope.employees[i].image);
                i ++;
                if(i == scope.employees.length)
                {
                    i = 0;
                }
            }
            var i = 0;
            //console.log('***' + scope.employees);
            let stopTime = $interval(updateTime, 6000);

            element.on('$destroy', function() {
            $interval.cancel(stopTime);
        });
    }
}]);
