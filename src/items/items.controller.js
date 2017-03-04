(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController)
        .filter('capitalize', function() {
            return function(input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
        });


    ItemsController.$inject = ['$rootScope', 'items'];

    function ItemsController($rootScope, items) {
        var category = this;
        console.log(items);
        category.name = items.category.name;
        category.special_instructions = items.category.special_instructions;
        category.items = items.menu_items;

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }

})();
