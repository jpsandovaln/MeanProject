angular.module('siderbar.directives',[])
    .directive('siderbar',[function(){
        return {
            restrict: 'E',
            templateUrl: './siderView.html',
            link: function($scope, iElem, iAttrs, controller) {

            }
        };
    }]);
