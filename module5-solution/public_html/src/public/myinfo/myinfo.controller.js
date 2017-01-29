(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MyInfoService','MenuService'];
function MyInfoController(MyInfoService,MenuService) {
  var $ctrl = this;
  $ctrl.myinfo = MyInfoService;
  $ctrl.user = MyInfoService.user;
  $ctrl.menu = MenuService;
  console.log("My Info Service", $ctrl.myinfo);
  console.log("$ctrl.user", $ctrl.user);
  console.log("$ctrl.menu", $ctrl.menu);
//  $ctrl.menuitems= MyInfoService.getMenuItems("L");
//  console.log("$ctrl.myinfo.MyInfoService L", $ctrl.menuitems);
  if (MyInfoService.user) {
    var category = ""; 
  console.log("category1:", category);
          $ctrl.user.dish.replace(/\d+/g);
  console.log("category2:", category);
  console.log("category:", category);
  var promise = MyInfoService.getMenuItemsNoPromise(category);
  console.log("promise", promise);
  var test = promise.then(function success(result) {
      console.log("result.data",result.data);
      console.log("result.data.menu_items",result.data.menu_items[0]);
      console.log("$ctrl.menuitems BEFORE",$ctrl.menuitems);
      $ctrl.menuitems = result.data.menu_items;
      
      for (var i = 0; i < $ctrl.menuitems.length ; i++) {
        var item = $ctrl.menuitems[i];
        
//        console.log("item",item.short_name);

        if (item.short_name === $ctrl.user.dish) {
            $ctrl.user.item = $ctrl.menuitems[i];
            console.log("$ctrl.user.item", $ctrl.user.item );
        };
    };
      
//  console.log("$ctrl.menuitems", $ctrl.menuitems);
//  console.log("test", test);
//  console.log("promise", promise);
  })}};
})();
