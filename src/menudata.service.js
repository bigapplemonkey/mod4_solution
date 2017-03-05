(function() {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');


    MenuDataService.$inject = ['$http', 'ApiBasePath'];

    function MenuDataService($http, ApiBasePath) {
        var service = this;

        var items = [];

        service.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/categories.json')
            }).then(function(result) {
                return result.data;
            });
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json?category=' + categoryShortName)
            }).then(function(result) {
                if (result.data.menu_items.length < 1) {
                    console.log('Empty')
                    throw new Error('Whoops!');
                };
                return result.data;
            });
        };
    }

})();
