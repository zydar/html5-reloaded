var reloaded = angular.module( "reloaded", [] );
reloaded.controller( "hello", ['$scope', '$http', 
    function($scope, $http){
        $scope.name = "Jeffrey";
        $http.get('json/user.json')
            .then( function(data){
                $scope.users = data;
                console.log(data);
        });
        console.log("Itt");
    }] 
);