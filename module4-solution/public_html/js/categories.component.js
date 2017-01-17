(function () {
'use strict';

angular.module('MenuApp')
.component('myCats', {
        templateUrl: "templates/categories.component.html",
        bindings: {
            categories: '<'
        }
    }
);
})();