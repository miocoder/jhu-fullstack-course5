(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];

function ItemsController(items) {
    console.log("IN ItemsController, items=", items);
    var itemsCtrl = this;
    itemsCtrl.items = items;
    console.log("FINISHED ItemsController, itemsCtrl.items=", itemsCtrl.items);
}

})();
