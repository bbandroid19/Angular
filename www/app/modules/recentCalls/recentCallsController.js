    angular.module('eyDial')
        .controller('recentCallsController', ['$scope', '$state', 'Service', '$location', 'ENV', '$rootScope', '$timeout', 'dbService', 'ngDialog', function ($scope, $state, Service, $location, ENV, $rootScope, $timeout, dbService, ngDialog) {

            $scope.init = function () {
                dbService.getRecent().then(function (item) {
                    $scope.recentCall = item;

                });
            };

            $scope.removeRecent = function (item) {
                var index = $scope.recentCall.indexOf(item);
                console.log(index);
                //                $scope.recentCall.splice(index, 1);
                ngDialog.openConfirm({
                    template: '<div id="confirmScreen"> <div id="confirmMessageHolder"> <div id="confirmMessageTitleHolder"> <div id="middleHolder"></div> <div id="confirmMessageTitleText"> Ey Dial  </div> </div> <div id="confirmMessageBodyHolder"> <div id="middleHolder"></div> <div id="confirmMessageText"> Do you want to delete? </div> </div> <div id="confirmMessageButtonHolder" > <div id="leftButtonHolder" ng-click="closeThisDialog(\'Yes\')"> <div id="middleHolder"></div> <div id="confirmMessageButtonText"> Yes </div> </div> <div id="rightButtonHolder" ng-click="closeThisDialog(\'No\')"> <div id="middleHolder"></div> <div id="confirmMessageButtonText"> No </div> </div> </div> </div> </div>',
                    plain: true,
                    scope: $scope
                }).then(function (value) {
                    dbService.deleteRecent($scope.recentCall[index]).then(function (data) {

                        $scope.recentCall.splice(index, 1);
                    })

                }, function (reject) {
                    if (reject === "Yes") {
                        dbService.deleteRecent($scope.recentCall[index]).then(function (data) {

                            $scope.recentCall.splice(index, 1);
                        })
                    }
                    console.log(reject);


                });
                //            $scope.ShowNgDialog();

            };

            $scope.init();
            $scope.showLeftMenu = function () {
                $('.menu').toggleClass('open');
                $('.ngView').toggleClass('pushScreenRight');
                $('.leftMenu').toggleClass('showLeftMenu');
                $('.leftmenuholder').toggleClass('leftmenuholderactive');

            };
            $scope.callPhone = function (item, phoneNumber) {

                console.log(phoneNumber);
                if (phoneNumber != "N/A" && phoneNumber != "") {
                    var d = new Date();
                    var href = "tel:" + phoneNumber;
                    var arr = {};
                    arr = {
                        'id': item.ID,
                        'number': phoneNumber,
                        'date': d,
                        'Title': item.Title,
                        'key': item.Title + d
                    };
                    window.location = href;
                    dbService.addToRecentCalls(arr).then(function (ret) {
                        console.log("Added to recent calls");
                    });
                }

            };

            $scope.ShowNgDialog = function () {

            };

        }]);
