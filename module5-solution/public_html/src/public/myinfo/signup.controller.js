(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MyInfoService'];
function SignUpController(MyInfoService) {
  var $ctrl = this;
  $ctrl.myinfo = MyInfoService;

$ctrl.submit = function () {
    console.log($ctrl.user);
    MyInfoService.user = $ctrl.user;
    MyInfoService.user.completed = true;
    console.log(MyInfoService.user);
};

}



})();
