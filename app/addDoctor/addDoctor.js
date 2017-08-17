/**
 * Created by gatomulesei on 8/11/2017.
 */
'use strict';

angular.module('myApp.addDoctor', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addDoctor', {
            templateUrl: 'addDoctor/addDoc.html',
            controller: 'addDoctorController'
        });
    }])

    .controller('addDoctorController', [ '$scope', '$location', '$cookies', 'addDoctorFactory', function($scope, $location, $cookies, addDoctorFactory) {

        /* $scope.takeQuiz = function(type){
         $location.path('/quiz').search({ quizType: type });
         }

         $scope.userRole = $cookies.get("userRole");
         console.log($scope.userRole);

         $scope.adminAdd = function(){
         $location.path('/admin')
         }*/

        $scope.goToHome = function(){
            $location.path('/home');
        }

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        }

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
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

        $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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


        $scope.form = {};


        $scope.addDoctor = function(firstName, lastName, cnp, dateOfBirth, email, phoneNumber, degree, position, departmentName) {

            $scope.addedDoctor = false;
            $scope.invalidDoctorForm = false;
            var departmentN = departmentName;

            var doctorObject = {
                "firstName": firstName,
                "lastName": lastName,
                "cnp": cnp,
                "birthDate": dateOfBirth,
                "email": email,
                "phoneNumber": phoneNumber,
                "degree": degree,
                "position": position,
                "departmentName": departmentName
            };

            if ($scope.addDoctorForm.$pristine || $scope.addDoctorForm.$invalid) {
                $scope.invalidDoctorForm = true;
                $scope.addedDoctor = false;
            } else {
                addDoctorFactory.addDoctor(doctorObject, departmentN).then(
                    function(responseSuccess) {
                        $scope.addedDoctor = true;
                        $scope.invalidDoctorForm = false;
                        $scope.addDoctorForm.$setPristine();
                    },
                    function(responseError) {
                        $scope.addedDoctor = false;
                        $scope.invalidDoctorForm = false;
                    }
                );
            }
        }

    }]);