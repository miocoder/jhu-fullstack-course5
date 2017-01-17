(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['cats'];

function CategoriesController(cats) {
    console.log("IN CategoriesController, cats=", cats);
    var catsCtrl = this;
    catsCtrl.categories = cats;
    console.log("FINISHED CategoriesController, catsCtrl.categories=", catsCtrl.categories);
}

})();
