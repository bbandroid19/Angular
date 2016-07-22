    angular.module('eyDial')
        .controller('dashBoardController', ['$scope', '$state', 'Service', '$location', 'ENV', '$rootScope', '$timeout', 'dbService', 'ngDialog', function ($scope, $state, Service, $location, ENV, $rootScope, $timeout, dbService, ngDialog) {

            $scope.init = function () {
                $scope.message = "Loading...";
                //                                             $('.menu').removeClass('open');
                Service.showLoader(true);
                $scope.modified = localStorage.getItem('modifieddate');
                $rootScope.showPage = true;
                if (!Service.dialInfo.length) {
                    dbService.getDialDetails().then(function (retObj) {
                        //console.log(retObj);
                        if (!retObj || !retObj.length) {
                            if ($rootScope.online) {
                                var k = 0;
                                Service.loadDial().then(function (data) {
                                    if (data) {
                                        $scope.cityArr = [];
                                        $scope.city = [];
                                        for (var i = 0; i < data.length; i++) {
                                            var city = false;
                                            if (data[i] && data[i].Title) {
                                                data[i].index = i;
                                                var dummyArr = [];

                                                var title = data[i].Title.split(',')[0];
                                                var tollfree = data[i].TollFree;
                                                var res = data[i].Res_x002e__x0020__x0026__x0020_S;
                                                for (var j = i; j < data.length; j++) {
                                                    if (data[j].Title && title === data[j].Title.split(',')[0]) {
                                                        dummyArr.push(data[j]);
                                                        //                                        city=true;
                                                        i = j;
                                                    }
                                                }
                                                $scope.city.push({
                                                    'Title': title,
                                                    'tollfree': tollfree,
                                                    'resSupport': res,
                                                    'data': dummyArr,
                                                    'ID': k++
                                                });
                                            }


                                        }
                                        console.log($scope.city);
                                        //                                     angular.forEach()
                                        $scope.dialData = $scope.city;
                                        Service.dialInfo = $scope.city;
                                        dbService.addDialDetails($scope.city).then(function (ret) {
                                            Service.showLoader(false);

                                        })
                                    } else {
                                        Service.showLoader(false);
                                        ngDialog.openConfirm({
                                            template: '<div id="alertScreen"> <div id="alertMessageHolder"> <div id="alertMessageTitleHolder"> <div id="middleHolder"></div> <div id="alertMessageTitleText"> Ey Dial </div> </div> <div id="alertMessageBodyHolder"> <div id="middleHolder"></div> <div id="alertMessageText"> Failed to fetch data. Please retry later </div> </div> <div id="alertMessageButtonHolder" ng-click="closeThisDialog()"> <div id="middleHolder"></div> <div id="alertMessageButtonText"> OK </div> </div> </div> </div>',
                                            plain: true,
                                            scope: $scope
                                        }).then(function (value) {
                                            $scope.dialData = [];
                                            Service.showLoader(false);
                                        }, function (reject) {
                                            $scope.dialData = [];
                                            console.log(reject);
                                            Service.showLoader(false);

                                        });
                                    }

                                });
                            } else {
                                Service.showLoader(false);
                                ngDialog.openConfirm({
                                    template: '<div id="alertScreen"> <div id="alertMessageHolder"> <div id="alertMessageTitleHolder"> <div id="middleHolder"></div> <div id="alertMessageTitleText"> Ey Dial </div> </div> <div id="alertMessageBodyHolder"> <div id="middleHolder"></div> <div id="alertMessageText"> No Internet Connection </div> </div> <div id="alertMessageButtonHolder" ng-click="closeThisDialog()"> <div id="middleHolder"></div> <div id="alertMessageButtonText"> OK </div> </div> </div> </div>',
                                    plain: true,
                                    scope: $scope
                                }).then(function (value) {
                                    $scope.dialData = [];
                                    Service.showLoader(false);
                                }, function (reject) {
                                    $scope.dialData = [];
                                    console.log(reject);
                                    Service.showLoader(false);

                                });
                            }

                        } else {
                            $scope.city = retObj;
                            Service.dialInfo = $scope.city;
                            Service.showLoader(false);

                        }
                    });


                } else {
                    $scope.city = Service.dialInfo;
                    Service.showLoader(false);

                }

            };

            $scope.clickToOpen = function (index) {
                $('.menu').toggleClass('open');
                $scope.open = true;
                console.log(index);
                $scope.Title = $scope.city[index.ID].Title;
                $scope.currentArr = $scope.city[index.ID].data;
                console.log($scope.currentArr.length);
                ngDialog.open({
                    template: 'app/modules/templates/detailedScreen.html',
                    scope: $scope
                });
            };
            $scope.init();
            $scope.showLeftMenu = function () {
                $('.menu').toggleClass('open');
                $('.ngView').toggleClass('pushScreenRight');
                $('.leftMenu').toggleClass('showLeftMenu');
                $('.leftmenuholder').toggleClass('leftmenuholderactive');

            };
            $scope.clearAll = function () {

                $scope.searchQuery = "";

            };
            $scope.expand = function ($index) {
                if ($index > 2) {
                    $timeout(function () {
                        var elem1 = document.getElementById('extra_' + $index);
                        var elem = document.getElementById('modaDataWrap');
                        elem.scrollTop = elem.scrollHeight;
                    }, 300);
                }


                $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
            };

            $scope.addtoFav = function (index, $event) {
                $event.stopPropagation();
                if ($scope.city[index].isFavourite) {
                    $scope.city[index].isFavourite = false;

                } else {
                    $scope.city[index].isFavourite = true;
                }

                Service.dialInfo[index] = $scope.city[index];

                dbService.addDialDetails(Service.dialInfo).then(function (ret) {

                })
            };

            $scope.callPhone = function (item, phoneNumber, $event) {
                if (!$scope.open) {
                    $event.stopPropagation();
                }

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
            $scope.refresh = function () {
                ngDialog.openConfirm({
                    template: '<div id="confirmScreen"> <div id="confirmMessageHolder"> <div id="confirmMessageTitleHolder"> <div id="middleHolder"></div> <div id="confirmMessageTitleText"> Ey Dial  </div> </div> <div id="confirmMessageBodyHolder"> <div id="middleHolder"></div> <div id="confirmMessageText"> Do you want to Refresh? </div> </div> <div id="confirmMessageButtonHolder" > <div id="leftButtonHolder" ng-click="closeThisDialog(\'Yes\')"> <div id="middleHolder"></div> <div id="confirmMessageButtonText"> Yes </div> </div> <div id="rightButtonHolder" ng-click="closeThisDialog(\'No\')"> <div id="middleHolder"></div> <div id="confirmMessageButtonText"> No </div> </div> </div> </div> </div>',
                    plain: true,
                    scope: $scope
                }).then(function (value) {
                    //                    

                }, function (reject) {
                    if (reject === "Yes") {
                        dbService.truncateDialDetails();
                        $scope.dialData = [];
                        Service.dialInfo = [];
                        $scope.init();
                    }
                    console.log(reject);


                });
                //                $scope.dummyData=$scope.dialData;

            };


        }]);
