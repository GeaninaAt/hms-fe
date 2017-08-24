'use strict';

angular.module('myApp.addExamination', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addExamination', {
            templateUrl: 'addExamination/addExamination.html',
            controller: 'addExaminationController'
        });
    }])

    .controller('addExaminationController', [ '$scope', '$location', '$cookies', 'addExaminationFactory', function($scope, $location, $cookies, addExaminationFactory) {


        addExaminationFactory.getDoctors().then(function(response) {

            $scope.doctorModel = [];
            $scope.doctors = response.data;
            for(var d in $scope.doctors) {
                $scope.doctorModel.push({
                    "doctorId":$scope.doctors[d].id,
                    "firstName": $scope.doctors[d].firstName,
                    "lastName": $scope.doctors[d].lastName
                })
            }
            console.log($scope.doctorModel);
        });

        $scope.change = function(a) {
            $scope.value = $scope.currentDoctor;
            console.log($scope.value);
        };


        var requestId = {
            patientId: $location.search().idPatient
        };
        addExaminationFactory.getPatient(requestId.patientId).then(function(response){
            $scope.currentPatient = response.data;
            console.log($scope.currentPatient)
        });



        $scope.addExamination = function(patientId, doctorId) {
            $scope.addedPatient = false;
            $scope.invalidPatientForm = false;
            console.log($scope.currentDoctor)
            patientId = $scope.currentPatient.id;
            doctorId = $scope.currentDoctor.doctorId;
            var examinationObject = {
                "date": $scope.date,
                "time": $scope.time
            };

            addExaminationFactory.addExamination(patientId, doctorId, examinationObject).then(
                function(responseSuccess) {
                    $scope.addedPatient = true;
                    $scope.invalidPatientForm = false;
                    $scope.examForm.$setPristine();
                },
                function(responseError) {
                    $scope.addedPatient = false;
                    $scope.invalidPatientForm = false;
                }
            );

        }


        $scope.goToHome = function(){
            $location.path('/home');
        };

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        };

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
        }

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };


        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }



    }]);