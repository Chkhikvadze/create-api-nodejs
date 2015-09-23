/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('myApp').factory('Project', ['$resource', 'appSettings',
    function ($resource, appSettings) {
        return $resource(appSettings.apiServiceBaseUri + "/project/:id", { id: '@_id' }, {
            query: {
                method: 'GET',
                isArray: false
            },
            update: {
                method: 'PUT'
            }
        });
    }]);