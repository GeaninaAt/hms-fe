'use strict';

angular.module('myApp.home', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])

.controller('homeController', [ '$scope', '$location', '$cookies', '$rootScope','homeFactory','$interval', function($scope, $location, $cookies, $rootScope, homeFactory, $interval) {

   /* $scope.takeQuiz = function(type){
            $location.path('/quiz').search({ quizType: type });
        }

    $scope.userRole = $cookies.get("userRole");
    console.log($scope.userRole);

    $scope.adminAdd = function(){
        $location.path('/admin')
    }*/


   $scope.alerta = false;

   $scope.callNurse = false;

   $scope.callANurse = function() {
     $scope.callNurse = true;
   };

   $scope.callTheNurse = function(bedNo) {
       alert(bedNo);

       homeFactory.getBed(bedNo).then(function(response) {
           console.log(response);
           //$scope.bedNumber = response.data.number;
           //$scope.roomCode = response.data.room.code

           var patientInfo = {
               "bedNo": response.data.number,
               "roomCode": response.data.room.code
           }

           var now = new Date();

           now.setSeconds(now.getSeconds() + 10);
           $cookies.put('callNurse',JSON.stringify(patientInfo),{
               expires: now
           });
       })
   };


    function checkForNotify(){
        if($cookies.get('callNurse')){
            var parsedObject = JSON.parse($cookies.get('callNurse'));
            $scope.alerta = true;
            $scope.bedNumber = parsedObject.bedNo;
            $scope.roomCode = parsedObject.roomCode;
        }else{
            $scope.alerta = false;
        }
        // console.log(cookie); // logs 'blabla'
    }

    $interval(function(){
         checkForNotify();
    },3000);



    function firstCtrl($scope) {
        $scope.$on('callEvent', function(event, data) { console.log(data); });
    }

   $scope.goToEmergencies = function() {
       $location.path('/emergencies');
   }

    $scope.goToNeurology = function() {
        $location.path('/neurology');
    }

    $scope.goToUrology = function() {
        $location.path('/urology');
    }

    $scope.goToCardiology = function() {
        $location.path('/cardiology');
    }

    $scope.goToAddPatient = function() {
       $location.path('/addPatient');
    }

    $scope.goToAddDoctor = function() {
       $location.path('/addDoctor');
    }

    $scope.goToUnadmittedPatients = function() {
       $location.path('/unadmittedPatients');
    }

    $scope.goToCreateAccount = function() {
       $location.path('/createAccount');
    }
}]);