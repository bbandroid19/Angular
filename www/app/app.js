angular.module('eyDial', [
    'ui.router',
    'config',
    'ngIOS9UIWebViewPatch',
    'ngTouch',
    'angularMoment',
    'ngDialog',
    'ngAnimate'
    ])
    .run(function ($rootScope, $window, dbService) {
        $rootScope.showPage = false;
        FastClick.attach(document.body);
        document.addEventListener("deviceready", function () {
            authDialog.authenticate("https://share.ey.net/sites/NITROLab");
        });
        dbService.init().then(function () {
            console.log("DB Initialised");
        });

        document.addEventListener("DOMContentLoaded", function () {
            // dbService.openDB();
        });
        //   angular.element('.leftMenu').css("display","none");
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                console.log("offline");
                $rootScope.online = false;
            });

        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                console.log("online");
                $rootScope.online = true;
            });
        }, false);


        // This code will use the native IndexedDB, if it exists, or the shim otherwis


    })
    .controller('mainController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

        $('#home').toggleClass('activeMenu');
        $('#homeIconHolder').toggleClass('activeMenu');
        $('#homeSelect').toggleClass('activeSelectBar');

        $scope.currentActiveMenuTitle = "#home";
        $scope.currentactiveMenuIcon = "#homeIconHolder";

        $scope.menuSelect = function (menuItem, titleName, navigateToPage) {
            $(menuItem).toggleClass('activeMenu');
            $(titleName).toggleClass('activeMenu');

            $($scope.currentActiveMenuTitle).toggleClass('activeMenu');
            $($scope.currentactiveMenuIcon).toggleClass('activeMenu');

            $state.go(navigateToPage);
            $('.menu').toggleClass('open');
            $('.ngView').toggleClass('pushScreenRight');
            $('.leftMenu').toggleClass('showLeftMenu');
            $('.leftmenuholder').toggleClass('leftmenuholderactive');

            //Add the Yellow bar to the left of the selected menu
            var oldSelectID = $scope.currentActiveMenuTitle + 'Select';
            var selectID = titleName + 'Select';
            console.log(oldSelectID);
            $(oldSelectID).toggleClass('activeSelectBar')
            $(selectID).toggleClass('activeSelectBar');


            //Setting the menu handlers
            $scope.currentActiveMenuTitle = titleName;
            $scope.currentactiveMenuIcon = menuItem;


        }
}]);
 