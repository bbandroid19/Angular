angular.module('eyDial')
    .service('Service', function (ENV, $http, $q) {
        this.current = {
            page: ''
        };
        this.dialInfo = [];
        this.dialInfoSearched = [];
        this.showLoader = function (IsOn) {
            if (IsOn) {
                $("#loadingScreenHolder").show();
                //			if(typeof(cordova) != "undefined" && window.plugins){
                //                window.plugins.spinnerDialog.show("","",true);
                //			}else{
                //				$(".loading").show();
                //			}
            } else {
                $("#loadingScreenHolder").hide();
                //			if(typeof(cordova) != "undefined" && window.plugins){
                //                    window.plugins.spinnerDialog.hide();
                //                $(".loading").hide();
                //			}else{
                //				$(".loading").hide();
                //			}
            }
        };

        this.loadDial = function () {
            var url = "https://share.ey.net/sites/NITROLab/EYGlobalMeet/_api/web/Lists/GetByTitle('GlobalDirectory')/items?$top=500";
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            };
            $http.get(url, config).success(function (response) {

                console.log(response);
                deferred.resolve(response.d.results);
                //                return jsonObj;
            }).error(function (msg, code) {
                deferred.resolve(null);
                //                return error;
            });
            return deferred.promise;
        };

        this.loadSpeedDials = function () {
            var url = "https://share.ey.net/sites/NITROLab/EYGlobalMeet/_api/web/lists/getbytitle('SpeedDials')/items ";
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            };
            $http.get(url, config).success(function (response) {

                console.log(response);
                deferred.resolve(response.d.results);
                //                return jsonObj;
            }).error(function (msg, code) {
                deferred.resolve(null);
                //                return error;
            });
            return deferred.promise;
        };


    });
