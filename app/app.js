'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.home',
    'myApp.quiz',
    'myApp.admin',
    'myApp.register',
    'myApp.emergencies',
    'myApp.neurology',
    'myApp.urology',
    'myApp.cardiology',
    'myApp.addPatient',
    'myApp.addDoctor',
    'myApp.patientPage',
    'myApp.admitPatient',
    'myApp.unadmittedPatients',
    'myApp.editPatient',
    'myApp.doctorPage',
    'myApp.editDoctor',
    'myApp.addExamination',
    'myApp.admissionsPage',
    'myApp.updateAdmission',
    'myApp.createAccount',
    'ui.bootstrap',
    'ngCookies'

]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    //$locationProvider.hashPrefix('!');
    $httpProvider.defaults.useXDomain = true;
    $routeProvider.otherwise({ redirectTo: '/login' });
}]);