angular.module('myApp').controller('projectEditController',
    ['$scope', '$location', '$http', 'appSettings', '$routeParams', 'Project',
        function ($scope, $location, $http, appSettings, $routeParams, Project) {
            $scope.doc = {};

            if ($routeParams.id) {
                Project.get({id: $routeParams.id}, function (response) {
                    $scope.doc = response.data;
                });
            }

            $scope.save = function () {
                if ($scope.doc._id) { // edit
                    Project.update($scope.doc);
                    $location.path($scope.url.project);
                } else { // add
                    Project.save($scope.doc);
                    $location.path($scope.url.project);
                }
            };
        }]);