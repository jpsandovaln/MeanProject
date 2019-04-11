angular.module('app.directives', [])
    .directive('navigationbar', [function(){
        return {
            restrict: 'E',
            templateUrl: './src/app/partials/navigationbar.html',
            link: function($scope, iElm, iAttrs, controller){

            }
        }
    }]);