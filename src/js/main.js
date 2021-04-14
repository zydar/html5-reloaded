var reloaded = angular.module( "reloaded", [] );
reloaded.controller( "hello", ['$scope', '$http', 
    function($scope, $http){
        $scope.name = "Jeffrey";

        $scope.users = [{
            "name": "Jeffrey",
            "age": 42,
            "address": "New York",
            "job": "programmer"
        },
        {
            "name": "Joe",
            "age": 16,
            "address": "New York",
            "job": "programmer"
        },
        {
            "name": "Jack",
            "age": 38,
            "address": "New York",
            "job": "programmer"
        },
        {
            "name": "Zsuzsi",
            "age": 54,
            "address": "New York",
            "job": "programmer"
        },
        {
            "name": "Józsi",
            "age": 22,
            "address": "New York",
            "job": "programmer"
        }];
        /* $http.get('json/user.json')
            .then( function(data){
                console.log(data);
        }); */
        console.log("Itt");
    }] 
);