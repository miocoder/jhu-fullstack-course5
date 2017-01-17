(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com/')
;

MenuDataService.$inject = ['$http','ApiBasePath','$q', '$timeout'];

function MenuDataService($http, ApiBasePath, $q, $timeout) {
    console.log("IN MenuDataService");
  var service = this;

  // List of shopping items
  var categories = [];

  // Pre-populate a no cookie list
  categories.push({
    name: "Sugar",
    quantity: "2 bags",
    description: "Sugar used for baking delicious umm... baked goods."
  });
  categories.push({
    name: "flour",
    quantity: "1 bags",
    description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
  });
  categories.push({
    name: "Chocolate Chips",
    quantity: "3 bags",
    description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
  });

  // Simulates call to server
  // Returns a promise, NOT items array directly

    service.getCategories = function () {
    console.log("IN service.getCategories");
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(categories);
    }, 10);
    console.log("FINISHING service.getCategories, return deferred.promise", deferred.promise);
    return deferred.promise;
  };
}

})();
