import $ from "jquery";

export default function apsUploadFile() {
    return {
        restrict: 'E',
        template: '<input id="fileInput" type="file" class="ng-hide"> <md-button id="uploadButton" class="md-raised md-primary" aria-label="attach_file">    Choose image file </md-button><md-input-container  md-no-float flex="50">    <input id="textInput" ng-model="fileName" type="text" placeholder="No file chosen" ng-readonly="true"></md-input-container>',
        link: apsUploadFileLink
    };

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
                scope.$parent.selectedFile = files[0];
                scope.$parent.fileName = files[0].name;
            } else {
                scope.$parent.fileName = null;
            }
            scope.$parent.$apply();
        });
    }
}
