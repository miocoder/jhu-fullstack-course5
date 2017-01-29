(function () {
"use strict";

angular.module('public')
.service('MyInfoService', MyInfoService);


MyInfoService.$inject = ['$http', 'ApiPath'];
function MyInfoService($http, ApiPath) {
  var service = this;

  service.getMyInfo = function (id) {
    var config = {};
    if (id) {
      config.params = {'id': id};
    }

    // TODO: Adapt to MyInfo Service
//    return $http.get(ApiPath + '/myinfo.json', config).then(function (response) {
//      return response.data;
//    });
  };
  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItemsNoPromise = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config)
    ;
  };
}



})();
