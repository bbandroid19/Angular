angular.module('eyDial')
    .directive("loader", function () {
        return {
            restrict: "E",
            template: '<div id="loadingScreenHolder"> <div id="loadingScreenMessage"> <i class="fa fa-spinner fa-pulse" id="loadingSpinner"></i> <div id="loadingScreen"> Loading..... </div> </div> </div>',
            link: function (scope, elem, attrs) {

            }
        };
    });
