(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
            url: '/',
            template: '<img class="ui wireframe image" ng-repeat="i in [1,2,3]" src="/images/short-paragraph.png">'
        })

        // Menu page
        .state('menu', {
            url: '/menu',
            template: '<categories categories="menu.categories"></categories>',
            controller: 'CategoriesController as menu',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        // Category page
        .state('menu.category', {
            url: '/category/{categoryId}',
            template: '<items items="category.items" name="category.name" instructions="category.special_instructions"></items>',
            controller: 'ItemsController as category',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    console.log($stateParams.categoryId);
                    return MenuDataService.getItemsForCategory($stateParams.categoryId);
                }]
            }
        });

    }

})();
