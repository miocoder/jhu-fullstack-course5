(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider) {
    
    $urlRouterProvider
            .otherwise('/');

    // State provider
    $stateProvider
    
    // Home page
            .state('home',{
                url: '/',
                templateUrl: 'templates/home.template.html'
            })
            
    // Categories
            .state('categories',{
                url: '/categories',
                templateUrl: 'templates/categories.controller.html',
//                template: '<div><h2>Categories Route</h2></div>',
                controller: 'CategoriesController as catsCtrl',
                resolve: {
                  cats: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories()
                            .then (function (response) { return response.data ;})
                  ;}]
                }
            })
            .state('items',{
                url: '/items/{categoryShortName}',
                templateUrl: 'templates/items.controller.html',
                controller: 'ItemsController as itemsCtrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService',
                      function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
//                          .then(function (items) {
//                            return items[$stateParams.categoryShortName];
                          .then (function (response) { return response.data ;
                          });
                    }]
            }
            })
    ;
    
    // Debugging
    console.log("$stateProvider", $stateProvider);
};
})();
