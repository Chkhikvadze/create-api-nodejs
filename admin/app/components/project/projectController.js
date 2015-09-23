'use strict';

angular.module('myApp').controller('projectController',
    ['$scope', '$location', '$route', 'Project',
        function ($scope, $location, $route, Project) {

            Project.query().$promise.then(function (response) {
                $scope.data = response.data;
            });


            $scope.delete = function (id, name) {
                deleteObjectNotification(name, function () {
                    Project.delete({id: id}, function (response) {
                        console.log(response);
                        $route.reload();
                    });
                });
            };
        }]);