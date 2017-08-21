/**
 * Created by gatomulesei on 8/13/2017.
 */
'use strict';

angular.module('myApp.admitPatient', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admitPatient', {
            templateUrl: 'admitPatient/admitPatient.html',
            controller: 'admitPatientController'
        });
    }])

    .controller('admitPatientController', [ '$scope', '$location', '$cookies', 'admitPatientFactory', function($scope, $location, $cookies, admitPatientFactory) {


        $scope.departments = [
            {
                name:"Emergencies"
            },
            {
                name:"Neurology"
            },
            {
                name:"Urology"
            },
            {
                name:"Neurology"
            }
        ];


        $scope.abcd = function() {
            alert("jdhsg")
        }

        $scope.setDoctorForDep = function(department) {
            console.log(department);
          $scope.selectedDep = department;
            admitPatientFactory.getDoctors($scope.selectedDep).then(function(response) {
                $scope.doctorModel = [];
                //alert(JSON.stringify(response));
                $scope.doctors = response.data;
                for(var i in $scope.doctors) {
                    $scope.doctorModel.push({
                        "doctorId":$scope.doctors[i].id,
                        "firstName": $scope.doctors[i].firstName,
                        "lastName": $scope.doctors[i].lastName
                    })
                }
                console.log($scope.doctorModel);
            });

            admitPatientFactory.getBeds($scope.selectedDep).then(function(response) {
                $scope.bedModel = [];
                //alert(JSON.stringify(response));
                $scope.beds = response.data;
                for(var i in $scope.beds) {
                    //console.log($scope.beds);
                    $scope.bedModel.push({
                        "bedId": $scope.beds[i].id,
                        "bedNo": $scope.beds[i].number,
                        "roomCode": $scope.beds[i].room.code
                    })
                }
                //console.log($scope.bedModel);
            });
        };
        $scope.admitPatient = function() {
           alert($scope.currentDoctor);
            //return;
            $scope.admittedPatient = false;
            $scope.invalidPatientForm = false;
            var admissionObject = {
                /*"department": $scope.currentDep,
                "doctor": $scope.currentDoctor,
                "bed": $scope.currentBed,*/
                "diagnosis": $scope.diagnosis,
                "treatmentInfo": $scope.treatmentInfo,
                "dischargeDate": $scope.dischargeDate
            };

            if ($scope.admitPatientForm.$pristine || $scope.admitPatientForm.$invalid) {
                $scope.invalidQuestionForm = true;
                $scope.addedQuestion = false;
            } else {
                admitPatientFactory.admitPatient(admissionObject).then(
                    function(responseSuccess) {
                        console.log(responseSuccess);
                        $scope.admittedPatient = true;
                        $scope.invalidPatientForm = false;
                        $scope.addPatientForm.$setPristine();
                    },
                    function(responseError) {
                        $scope.admittedPatient = false;
                        $scope.invalidPatientForm = false;
                    }
                );
            }
        }


        $scope.goToHome = function(){
            $location.path('/home');
        };

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        };

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


        $scope.getDoctors = function(department) {

        }
    }]);