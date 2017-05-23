/**
 * Created by gatomulesei on 5/19/2017.
 */
'use strict';

angular.module('myApp.addQuestion')

    .factory("addQuestionFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

/*        //get Locations http call
        var getLocations = function() {
            var url = 'http://localhost:8080/rest/locations';
            var config = {
                headers: {
                    "Authorization": "Bearer " + $cookies.get("userToken")
                }
            }
            return $http.get(url, config).then(function(response) {
                return response.data;
            })
        }

        //get Organizers http call
        var getOrganizers = function() {
            var url = 'http://localhost:8080/rest/organizers';
            //we have to change this
            var config = {
                headers: {
                    "Authorization": "Bearer " + $cookies.get("userToken")
                }
            }
            return $http.get(url, config).then(function(response) {
                //console.log(response);
                return response.data;

            })
        }*/

        //add Question http call
        var addQuestion = function(questionData) {
            var url = 'http://localhost:8080/admin/addQuestion/' + response.data.id; //?
            console.log(questionData);
            //we have to change this
/*            var config = {
                headers: {
                    "Authorization": "Bearer " + $cookies.get("userToken")
                }
            }*/
            return $http.post(url, questionData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        }

        return {
            addQuestion: addQuestion
        }
    }])