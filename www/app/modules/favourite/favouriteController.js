    angular.module('eyDial')
        .controller('favouriteController', ['$scope', '$state', 'Service', 'ENV', '$rootScope', '$stateParams', '$timeout', '$sce', '$window', 'dbService', 'ngDialog', function ($scope, $state, Service, ENV, $rootScope, $stateParams, $timeout, $sce, $window, dbService, ngDialog) {

            $scope.init = function () {
                Service.showLoader(true);
                $scope.favourite = [];
                angular.forEach(Service.dialInfo, function (item, index) {
                    if (item.isFavourite) {
                        $scope.favourite.push(item);
                    }

                });
                Service.showLoader(false);
            };


            $scope.init();
            $scope.showLeftMenu = function () {
                $('.menu').toggleClass('open');
                $('.ngView').toggleClass('pushScreenRight');
                $('.leftMenu').toggleClass('showLeftMenu');
                $('.leftmenuholder').toggleClass('leftmenuholderactive');

            };
            $scope.clearAll = function () {
                $scope.isSearched = false;
                $scope.searchQuery = null;

            };
            $scope.expand = function ($index) {
                if ($index > 2) {
                    $timeout(function () {
                        var elem1 = document.getElementById('extra_' + $index);
                        var elem = document.getElementById('modaDataWrap');
                        elem.scrollTop = elem.scrollHeight;
                    }, 300);
                }
                //                $scope.currentArr=$scope.city[$index].data;
                $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
            };

            $scope.clickToOpen = function (index) {
                $('.menu').toggleClass('open');
                console.log(index);
                $scope.Title = $scope.favourite[index].Title;
                $scope.currentArr = $scope.favourite[index].data;
                console.log($scope.currentArr.length);
                ngDialog.open({
                    template: 'app/modules/templates/detailedScreenFav.html',
                    scope: $scope
                });
            };
            $scope.callPhone = function (item, phoneNumber, $event) {
                $event.stopPropagation();
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
            $scope.addtoFav = function (index, $event) {
                $event.stopPropagation();
                ngDialog.openConfirm({
                    template: '<div id="confirmScreen"> <div id="confirmMessageHolder"> <div id="confirmMessageTitleHolder"> <div id="middleHolder"></div> <div id="confirmMessageTitleText"> Ey Dial  </div> </div> <div id="confirmMessageBodyHolder"> <div id="middleHolder"></div> <div id="confirmMessageText"> Do you want to remove ? </div> </div> <div id="confirmMessageButtonHolder" > <div id="leftButtonHolder" ng-click="closeThisDialog(\'Yes\')"> <div id="middleHolder"></div> <div id="confirmMessageButtonText"> Yes </div> </div> <div id="rightButtonHolder" ng-click="closeThisDialog(\'No\')"> <div id="middleHolder"></div> <div id="confirmMessageButtonText"> No </div> </div> </div> </div> </div>',
                    plain: true,
                    scope: $scope
                }).then(function (value) {

                }, function (reject) {


                    if (reject === "Yes") {
                        $scope.favourite[index].isFavourite = false;
                        var indexVal = Service.dialInfo.indexOf($scope.favourite[index]);
                        Service.dialInfo[indexVal] = $scope.favourite[index];

                        dbService.addDialDetails(Service.dialInfo).then(function (ret) {
                            $scope.favourite.splice(index, 1);
                        });
                    }
                    console.log(reject);


                });

            };

        }]);
