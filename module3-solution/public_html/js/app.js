(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com/');

NarrowItDownController.$inject = ['MenuSearchService'];
MenuSearchService.$inject = ['$http','ApiBasePath'];
//FoundItems.$inject = ['NarrowItDownController'];

function MenuSearchService ($http,$ApiBasePath){
    
    var URL = $ApiBasePath + "menu_items.json";
    var service = this;
    service.found = [];
    
    service.getMatchedMenuItems = function (searchTerm) {

    console.log("Entered service.getMatchedMenuItems with param: searchTerm=", searchTerm);
    return $http({
        "method" : "GET",
        "url" : URL
    })
    .then(
        function (result) {
          // process result and only keep items that match
          var foundItems = [];
          var data = result.data;
//          console.log("$http success, result=", result);
//          console.log("$http success, result.data=", result.data);
          
          var menu_items = result.data.menu_items;
          // return processed items
          
          var item;
          for (var i = 0; i < menu_items.length; i++) {
              item = menu_items[i];
//              console.log("$http success, menu_items[i]=", menu_items[i]);

//              console.log("item.name.indexOf(searchTerm)=", item.name.indexOf(searchTerm));
                if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                foundItems.push(item);  
              };
          };

//            console.log("$http success, foundItems[]=", foundItems);
            service.found = foundItems;
//            console.log("$http success, service.found=", service.found);            
//            return foundItems;
        },
        function (error) {
            console.log("Error in $http.then error=", error);
        }
        );  
    };
    
    service.getFound = function () {
      return service.found;  
    };
    
    service.isFoundEmpty = function () {
      return (service.found.length === 0);
    };
    
    service.removeItem = function (index) {
    console.log("IN service.removeItem, parameter index=", index);
    console.log("BEFORE splice service.found[index]=" + service.found[index]);
    console.log("BEFORE splice(index, 1) service.found=", service.found);

    var removedItem = service.found.splice(index, 1);
    console.log("AFTER splice(index, 1) removedItem=", removedItem);    
    console.log("AFTER splice(index, 1) service.found=", service.found);
    };
    
};

function NarrowItDownController(MenuSearchService) {

    var ctrl = this;
    //    keeping next ctrl.found as static list, just in case we need to test
    // TODO: ctrl.found implementation, uncomment if we need to keep ctrl.found as array in controller 

//    ctrl.found = [
//        {"name" : "item1"},
//        {"name" : "item2"},
//        {name : "item3"},
//        {name : "item4"}        
//    ];
    ctrl.found = MenuSearchService.getFound;
    ctrl.removeItem = MenuSearchService.removeItem; 


    // TODO: ctrl.found implementation, uncomment if we need to keep ctrl.found as array in controller 
//    ctrl.removeItem = function (index) {
//    console.log("IN ctrl.removeItem, parameter index=", index);
//    console.log("IN ctrl.removeItem, parameter index.index=", index);
//    console.log("BEFORE splice ctrl.found[index.index]=" + ctrl.found[index]);
//    console.log("BEFORE splice(index, 1) service.found=", ctrl.found);
//
//    var removedItem = ctrl.found.splice(index, 1);
//    console.log("AFTER splice(index, 1) removedItem=", removedItem);    
//    console.log("AFTER splice(index, 1) ctrl.found=", ctrl.found);
//    }; 

    ctrl.searchTerm = "";
    ctrl.isEmpty = MenuSearchService.isFoundEmpty;

    // TODO: Cleanup empty ctrl.narrowDown in case we don't need to test it further
    // TODO: ctrl.found implementation, uncomment if we need to keep ctrl.found as array in controller 
//    ctrl.narrowDown = function () {};
    ctrl.narrowDown = function () {
    console.log("Entered ctrl.narrowDown, value of ctrl.searchTerm=", ctrl.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    console.log("NarrowItDownController has been set with promise=", promise);
    console.log("ctrl.found=", ctrl.found);
    };

    console.log("ctrl.found=", ctrl.found);
    console.log("ctrl.items=", ctrl.items);
};

function FoundItemsDirective() {
    var ddo = {
        templateUrl: "foundItems.html",
        restrict: "AE",
        scope: {
            found: '<items',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };
    
    return ddo;
};

function FoundItemsDirectiveController() {
  var list = this;
};

})();

