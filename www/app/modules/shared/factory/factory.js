//angular.module('smartmeetApp')
// 
//.factory('DirectoryUtils',function($q,ngDialog,$filter){
//    
//
//
//    return{
//    
//        
//     
//    // Left Menu Service
//    
//        showAlert : function(title, message){
//
//              var messageContents = [message,title];
//
//             var alertMessage = ngDialog.open({template: '.app/modules/templates/alertMessageScreen.html',
//                          controller:'recentCallsController',
//                          showClose: false,
//                          cache:false,
//                        resolve: {
//                           messageContents: function () {
//                           return messageContents;
//                          },
//                          type:function(){
//                            return 'alertMessageOK';
//                          },
//                                                    
//                          },
//
//                       preCloseCallback: function(value) {
//                          // $scope.applyFilters();
//                         // if($rootScope.applyFilter){
//                         //   $scope.search();
//                         // }
//       
//                        }
//                    });
//              return alertMessage;
//        },
//
//        dismissAlert:function(alertMessage){
//          alertMessage.close();
//        },
//
////        showLoadingScreen : function(message){
////
////              var messageContents = [message]; 
////
////              var loadingScreen = ngDialog.open({template: 'templates/loadingScreen.html',
////                          controller:'messagesCtrl',
////                          showClose: false,
////                          cache:false,
////                        resolve: {
////                           messageContents: function () {
////                           return messageContents;
////                          },
////                          type:function(){
////                            return 'loadingScreen';
////                          },
////                  
////                          },
////
////                       preCloseCallback: function(value) {
////                          // $scope.applyFilters();
////                         // if($rootScope.applyFilter){
////                         //   $scope.search();
////                         // }
////       
////                        }
////                    });
////              return loadingScreen;
////        },
////
////        hideLoadingScreen : function (loadingScreen){
////            loadingScreen.close();
////        }
////        
//         
//}
//});