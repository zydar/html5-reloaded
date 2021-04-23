// Body controller
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', '$rootScope', 
    function($scope, $http, userFactory, $rootScope){
        $scope.isLoggedIn = false;
        $scope.defaultContent = 'index';
        $scope.currentContentName = '';

        $rootScope.$on( 'noLogin', function() {
            $scope.isLoggedIn = false;
        } );

        // Ha már be van jelentkezve és van érvényes tokenje
        userFactory.checkLogin()
            .then(function(res) {
                $scope.isLoggedIn = res.loggedIn;
                $scope.currentUser = res.user;
            });

        // Bejelentkezés, a login form gombjára kattintva
        $scope.doLogin = function(loginData) {
            // console.log('loginData', loginData);
            if (!loginData) {
                alert('Kérjük töltse ki a mezőket!');
                return;
            }
            if (!loginData.email || !loginData.pass) {
                alert('Kérjük töltse ki a mezőket!');
                return;
            }
            userFactory.doLogin(loginData)
                .then(function(serverData) {
                    $scope.isLoggedIn = serverData.loggedIn;
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