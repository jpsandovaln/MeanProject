angular.module('intervalExample', [])
    .controller('ExampleController', ['$scope', '$interval', '$http',
      function($scope, $interval, $http) {
        $http({
            method: 'get', 
            url: 'http://localhost:3000/crud/employees/birthdaylist'
        }).then(function (response) {
            console.log(response, 'res');
            $scope.images = response.data;
        }, function (error) {
            console.log(error, 'can not get data.');
        });
      }])
    .directive('myImages', ['$interval', 'dateFilter',
      function($interval, dateFilter) {
        // return the directive link function. (compile function not needed)
        return function(scope, element, attrs) {
    
          function updateTime() {
            attrs.$set('src',scope.images[i].image);
            i ++
            if(i == scope.images.length)
            {
              i = 0
            }
          }

          // watch the expression, and update the UI on change.
          
          var i = 0;
          stopTime = $interval(updateTime, 6000);

          // listen on DOM destroy (removal) event, and cancel the next UI update
          // to prevent updating time after the DOM element was removed.
          element.on('$destroy', function() {
            $interval.cancel(stopTime);
          });
        }
      }]);