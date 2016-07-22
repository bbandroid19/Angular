angular.module('eyDial')
    .service('dbService', function ($q, $timeout, $rootScope, ENV, Service) {
        var setUp = "";
        var db;
        this.init = function () {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
            var deferred = $q.defer();

            if (setUp) {
                deferred.resolve(true);
                return deferred.promise;
            }

            var openRequest = indexedDB.open("EyDial", 1);

            openRequest.onerror = function (e) {
                //console.log("Error opening db");
                //console.dir(e);
                deferred.reject(e.toString());
            };

            openRequest.onupgradeneeded = function (e) {

                var thisDb = e.target.result;
                var objectStore;

                //Create Meetings
                if (!thisDb.objectStoreNames.contains("DialDetails")) {
                    objectStore = thisDb.createObjectStore("DialDetails", {

                        autoIncrement: true
                    });

                }
                if (!thisDb.objectStoreNames.contains("RecentCalls")) {
                    objectStore = thisDb.createObjectStore("RecentCalls", {

                        autoIncrement: true
                    });

                }
                if (!thisDb.objectStoreNames.contains("SpeedDial")) {
                    objectStore = thisDb.createObjectStore("SpeedDial", {
                        autoIncrement: true
                    });

                }

            };
            openRequest.onsuccess = function (e) {
                db = e.target.result;
                db.onerror = function (event) {
                    // Generic error handler for all errors targeted at this database's
                    // requests!
                    deferred.reject("Database error: " + event.target.errorCode);
                };
                setUp = true;
                deferred.resolve(true);
            };
            return deferred.promise;
        };
        this.truncateDialDetails = function () {
            var objectStore = db.transaction("DialDetails", "readwrite").objectStore("DialDetails");
            var req = objectStore.clear();
            req.onsuccess = function (e) {
                console.log("Data Cleared");
            };
            req.onerror = function (e) {
                //console.log("Data No cleared. Error" + e);
            };
        };
        this.addDialDetails = function (data) {
            var defer = $q.defer();
            var promises = [];
            //console.log(data);
            var objectStore = db.transaction("DialDetails", "readwrite").objectStore("DialDetails");
            var req = objectStore.clear();
            req.onsuccess = function (e) {
                //console.log("Data Cleared");
            };
            req.onerror = function (e) {
                //console.log("Data No cleared. Error" + e);
            };
            $.each(data, function (key, value) {
                var request = objectStore.add(JSON.stringify(data[key]));
                request.onsuccess = function (event) {
                    //console.log("Data Insertion success");
                    promises.push(request);
                };
                request.onerror = function (e) {
                    //console.log(e);
                };
            });
            $q.all(promises).then(defer.resolve());
            return defer.promise;
        };
        this.getDialDetails = function () {
            var defer = $q.defer();
            var returnData = [];
            var self = this;
            self.init().then(function () {
                var objectStore = db.transaction("DialDetails", "readwrite").objectStore("DialDetails");
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = objectStore.openCursor(keyRange);
                cursorRequest.onsuccess = function (e) {
                    var result = e.target.result;
                    if (!!result === false) {
                        defer.resolve(returnData);
                        return
                    }
                    returnData.push(JSON.parse(result.value));
                    result.continue();
                };
            });
            return defer.promise
        };
        this.addToRecentCalls = function (item) {
            var defer = $q.defer();
            var promises = [];
            //console.log(data);
            var objectStore = db.transaction("RecentCalls", "readwrite").objectStore("RecentCalls");
            var request = objectStore.add(JSON.stringify(item), item.key);
            request.onsuccess = function (event) {
                defer.resolve();
            };
            request.onerror = function (e) {
                //console.log(e);
            };


            return defer.promise;
        };
        this.getRecent = function () {
            var defer = $q.defer();
            var returnData = [];
            var self = this;
            self.init().then(function () {
                var objectStore = db.transaction("RecentCalls", "readwrite").objectStore("RecentCalls");
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = objectStore.openCursor(keyRange);
                cursorRequest.onsuccess = function (e) {
                    var result = e.target.result;
                    if (!!result === false) {
                        defer.resolve(returnData);
                        return
                    }
                    returnData.push(JSON.parse(result.value));
                    result.continue();
                };
            });
            return defer.promise
        };
        this.deleteRecent = function (item) {
            var defer = $q.defer();
            var returnData = [];
            var self = this;
            var objectStore = db.transaction("RecentCalls", "readwrite").objectStore("RecentCalls");
            var request = objectStore.delete(item.key);
            request.onsuccess = function (event) {
                defer.resolve();
            };
            request.onerror = function (e) {
                //console.log(e);
            };

            return defer.promise
        };
        this.addSpeedDials = function (data) {
            var defer = $q.defer();
            var promises = [];
            //console.log(data);
            var objectStore = db.transaction("SpeedDial", "readwrite").objectStore("SpeedDial");
            var req = objectStore.clear();
            req.onsuccess = function (e) {
                //console.log("Data Cleared");
            };
            req.onerror = function (e) {
                //console.log("Data No cleared. Error" + e);
            };
            $.each(data, function (key, value) {
                var request = objectStore.add(JSON.stringify(data[key]));
                request.onsuccess = function (event) {
                    //console.log("Data Insertion success");
                    promises.push(request);
                };
                request.onerror = function (e) {
                    //console.log(e);
                };
            });
            $q.all(promises).then(defer.resolve());
            return defer.promise;
        };
        this.getSpeedDials = function () {
            var defer = $q.defer();
            var returnData = [];
            var self = this;
            self.init().then(function () {
                var objectStore = db.transaction("SpeedDial", "readwrite").objectStore("SpeedDial");
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = objectStore.openCursor(keyRange);
                cursorRequest.onsuccess = function (e) {
                    var result = e.target.result;
                    if (!!result === false) {
                        defer.resolve(returnData);
                        return
                    }
                    returnData.push(JSON.parse(result.value));
                    result.continue();
                };
            });
            return defer.promise
        };

    });
