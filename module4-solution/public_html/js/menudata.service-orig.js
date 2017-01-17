(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com/')
;

MenuDataService.$inject = ['$http','ApiBasePath'];


function MenuDataService ($http,$ApiBasePath){
    console.log("IN MenuDataService");

    var service = this;    
    service.getAllCategories = function () {
        var allCategoriesURL = $ApiBasePath + "categories.json";
        console.log("IN MenuDataService, allCategoriesURL=", allCategoriesURL);
        return $http({
            "method" : "GET",
            "url" : allCategoriesURL
        })
        .then (function (response) {
            return response;
        });
    };
    
    service.getItemsForCategory= function (categoryShortName) {
        var categoryURL = $ApiBasePath + "menu_items.json";
        return $http({
            method : "GET",
            url : categoryURL,
            params : {
              category: categoryShortName
            }
        });
        
    };
    
};
})();

