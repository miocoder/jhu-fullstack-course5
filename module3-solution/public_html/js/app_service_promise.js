(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
MenuSearchService.$inject = ['$http'];
//FoundItems.$inject = ['NarrowItDownController'];

function MenuSearchService ($http){
    
    var URL = "https://davids-restaurant.herokuapp.com/menu_items.json";
    var service = this;
    
    service.getMatchedMenuItems = function (searchTerm) {

    console.log("Entered service.getMatchedMenuItems with param: searchTerm=", searchTerm);
    return $http({
        "method" : "GET",
        "url" : URL
    })
    .then(
        function success(result) {
          // process result and only keep items that match
          var foundItems = [];
          var data = result.data;
          console.log("$http success, result=", result);
          console.log("$http success, result.data=", result.data);
          
          var menu_items = result.data.menu_items;
          // return processed items
          
          var item;
          for (var i = 0; i < menu_items.length; i++) {
              item = menu_items[i];
              console.log("$http success, menu_items[i]=", menu_items[i]);
              if (item.name.indexOf(searchTerm)) {
                foundItems.push(item);  
              };
          };

            console.log("$http success, foundItems[]=", foundItems);
            return foundItems;
        },
        function error(result) {
            console.log("Error in $http.then error=", error);
        }
        );  
    };
    
};

function NarrowItDownController(MenuSearchService) {

    var ctrl = this;

    ctrl.found;
    
    ctrl.searchTerm = "";
    
    ctrl.testText = "Test Text!!!";
    
    ctrl.narrowDown = function () {
    console.log("Entered ctrl.narrowDown, value of ctrl.searchTerm=", ctrl.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        
    console.log("ctrl.found has been updated to ctrl.found=", ctrl.found);
    };
};

function FoundItems() {
    var ddo = {
//        template: "Hello World!"
        template: "{{ item.name }}",
        restrict: "A"
    };
    
    return ddo;
};
})();

