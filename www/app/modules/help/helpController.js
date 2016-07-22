    angular.module('eyDial')
        .controller('helpController', ['$scope', '$state', 'Service', 'ENV', '$rootScope', '$stateParams', '$timeout', '$sce', '$window', 'dbService', 'ngDialog', function ($scope, $state, Service, ENV, $rootScope, $stateParams, $timeout, $sce, $window, dbService, ngDialog) {
            $scope.init = function () {
                Service.showLoader(true);
                dbService.getSpeedDials().then(function (data) {
                    if (data && data.length) {
                        $scope.speedDial = data;
                        Service.showLoader(false);
                    } else {
                        if ($rootScope.online) {
                            Service.loadSpeedDials().then(function (data) {
                                $scope.speedDial = data;
                                dbService.addSpeedDials(data);
                                Service.showLoader(false);
                            });
                        } else {

                            ngDialog.openConfirm({
                                template: '<div id="alertScreen"> <div id="alertMessageHolder"> <div id="alertMessageTitleHolder"> <div id="middleHolder"></div> <div id="alertMessageTitleText"> Ey Dial </div> </div> <div id="alertMessageBodyHolder"> <div id="middleHolder"></div> <div id="alertMessageText"> No Internet Connection </div> </div> <div id="alertMessageButtonHolder" ng-click="closeThisDialog()"> <div id="middleHolder"></div> <div id="alertMessageButtonText"> OK </div> </div> </div> </div>',
                                plain: true,
                                scope: $scope
                            }).then(function (value) {

                                Service.showLoader(false);
                            }, function (reject) {

                                console.log(reject);
                                Service.showLoader(false);

                            });
                        }

                    }
                })

            };
            $scope.init();
            $scope.showLeftMenu = function () {
                $('.menu').toggleClass('open');
                $('.ngView').toggleClass('pushScreenRight');
                $('.leftMenu').toggleClass('showLeftMenu');
                $('.leftmenuholder').toggleClass('leftmenuholderactive');

            };

            $scope.expand = function ($index) {
                $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
            };
            $scope.callPhone = function (item, phoneNumber) {
                //console.log(phoneNumber);
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
                        //console.log(ret);
                    });
                }

            };

        }]);
