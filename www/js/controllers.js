angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})



.controller('SearchCtrl', function($scope, $state, $http, BeerData) {     // use dependency injection to get the BeerData factory
  $scope.form = {};                                                       // used to store your form data

  $scope.search = function() {                                            // called when the search button is clicked
      parmInput = {}

     if($scope.form.name){
        parmInput.name = $scope.form.name;
    }

     parmInput.isOrganic = $scope.form.organic ?"Y":"N";
      
    if($scope.form.year){
        parmInput.year = $scope.form.year;
    }
    if($scope.form.abv){
        parmInput.abv = $scope.form.abv;
    }  
    if($scope.form.ibu){
        parmInput.ibu = $scope.form.ibu;
    }   
      
      
      
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',               // the link to my proxy
      params:parmInput
    

        
    
          
    }).then(function successCallback(response) {
      BeerData.data = response.data;                                      // save the response data in the factory
      $state.go('app.beers');                                             // go to the beer results state
    });
  }
})

.factory('BeerData', function(){                                          // This factory stores information as a singleton so multiple controllers can access it
  return {data: {}};
})
.factory('myBeer', function(){
  return {data: {}};     
})

.controller('BeersCtrl', function($scope, $state, BeerData, myBeer) {
  $scope.playlists = BeerData.data.data;
  console.log(BeerData.data);      

  $scope.getDetails = function(playlist) {
      myBeer.data = playlist;
      console.log('Before passing data');

      $state.go('app.beer');
  }

})


.controller('BeerCtrl', function($scope, $stateParams, BeerData, myBeer, $state) {        // use dependency injection to get the BeerData factory
  console.log($stateParams.id);   
    
  $scope.myBeerInfo = myBeer.data;
  console.log(myBeer.data);   

    // test to make sure the id gets passed through the URL

  // make another http request to get the beer or...
  // loop through BeerData to find the beer with the same id
});
