(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckoffService', ShoppingListCheckoffService);

ToBuyController.$inject = ['ShoppingListCheckoffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];

function ShoppingListCheckoffService (){
    
    var service = this;
    
    service.itemsToBuyArray = [];
    service.itemsBoughtArray = [];

    for (var i = 1; i < 6; i++) {
    var name = "item number:" + i + " coookies";
    var quantity = i * 10 ;
    var item = {
        "name": name,
        "quantity": quantity      
    };
    service.itemsToBuyArray.push(item);
    }

    // function to move item from toBuyArray to boughtArray
    service.buyItem = function (index) {
        console.log("BEFORE this.itemsBoughtArray=", service.itemsBoughtArray);
        console.log("Entered service buyItem function with parameter index=", index);
        var itemToMove = service.itemsToBuyArray.pop(index);
        console.log("Item to move itemToMove=", itemToMove);
        service.itemsBoughtArray.push(itemToMove);
        console.log("AFTER this.itemsBoughtArray=", service.itemsBoughtArray);
    };
    service.getItemsToBuy = function () {
        return service.itemsToBuyArray;
    };
    service.getItemsBought = function () {
        return service.itemsBoughtArray;
    };

    service.isItemsToBuyEmpty = function () {
        console.log("service.itemsToBuyArray", service.itemsToBuyArray);
        var isItemsToBuyEmpty = (service.itemsToBuyArray.length < 1 );
        console.log("service.isItemsToBuyEmpty", isItemsToBuyEmpty);
        return isItemsToBuyEmpty;
    };

    service.isItemsBoughtEmpty = function () {
        var isItemsBoughtEmpty = (service.itemsBoughtArray.length < 1 );
        console.log("service.isItemsBoughtEmpty", isItemsBoughtEmpty);
        return isItemsBoughtEmpty;
    };
    
};

function ToBuyController(ShoppingListCheckoffService) {

    var ctrl = this;
    ctrl.items = ShoppingListCheckoffService.getItemsToBuy();
    
    ctrl.buyItem = function (index) {
        console.log("Entered controller buyItem function with parameter index=" + index);
        ShoppingListCheckoffService.buyItem(index);
    };
    ctrl.isempty = function () {
        var isempty = ShoppingListCheckoffService.isItemsToBuyEmpty();
        console.log("ToBuyController.isempty", isempty);
        return isempty;
    };

};

function AlreadyBoughtController(ShoppingListCheckoffService) {
    
    var ctrl = this;
    ctrl.items = ShoppingListCheckoffService.getItemsBought();
//    this.isempty = ShoppingListCheckoffService.isItemsBoughtEmpty();
    ctrl.isempty = function () {
        var isempty = ShoppingListCheckoffService.isItemsBoughtEmpty();
        console.log("AlreadyBoughtController.isempty", isempty);
        return isempty;
    };

};

})();

