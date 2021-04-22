// Body controller
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', '$rootScope', 
    function($scope, $http, userFactory, $rootScope){
        $scope.isLoggedIn = true;
        $scope.defaultContent = 'index';
        $scope.currentContentName = '';
        
        // Bejelentkezés
        $scope.doLogin = function() {
            if (!$scope.loginData) {
                alert('Kérjük töltse ki a mezőket!');
                return;
            }
            if (!$scope.loginData.email || !$scope.loginData.pass) {
                alert('Kérjük töltse ki a mezőket!');
                return;
            }
            userFactory.checkLogin($scope.loginData)
                .then(function(loggedIn) {
                    $scope.isLoggedIn = loggedIn;
                });
        }

        // Fájlok kezelése
        $scope.getTemplate = function(name) {
            return 'template/'+name+'.html';
        }

        // Tartalom váltó
        $scope.getContent = function(name) {
            if (angular.isUndefined(name)) {
                name = $scope.defaultContent;
            }
            $scope.currentContentName = name;
            $scope.currentContent = $scope.getTemplate('content/'+name);
        }

        // $scope.getContent();

        // Oldalváltás figyelése
        $rootScope.$on('$routeChangeSuccess', function(oldRoute, newRoute){
            if (angular.isUndefined(newRoute.$$route)) {
                $scope.currentContentName = $scope.defaultContent;
            } else {
                $scope.currentContentName = newRoute.$$route.originalPath.replace('/', '');
            }
        });
        
    }] 
);