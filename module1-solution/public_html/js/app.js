(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', MsgController);

MsgController.$inject = ['$scope', '$filter'];
function MsgController($scope, $filter) {
  $scope.lunchmenufield = "";
  $scope.lunchmessage = "";

  
  $scope.checkLunch = function() {
    console.log("entered checkLunch function");  
    console.log($scope.lunchmenufield);
    
    var lunchmenuitemsarray = $scope.lunchmenufield.split(',');
    if ($scope.lunchmenufield === "" ) {
    console.log("Item list is empty, please enter list of meals");
    $scope.lunchmessage = "Please enter data first";
    } else if (lunchmenuitemsarray.length > 3) {
    console.log("That's too much, you have more than 3 meals!!");                
    $scope.lunchmessage = "Too much!";
    } else {
    console.log("You have " + lunchmenuitemsarray.length + " items!!");                        
    console.log("First item is" + lunchmenuitemsarray[0] + "!!");                        
    $scope.lunchmessage = "Enjoy!";
    };
  };
}

})();
