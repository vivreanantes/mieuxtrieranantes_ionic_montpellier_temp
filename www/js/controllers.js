angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    
  // TEMP CRN
  $scope.myFunctionName = function(){
    //return true or false here
    if (isPageActive('accueil_nantes')) {
      return true;
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('DechetCatCtrl', function($scope) {
    
  // TEMP CRN
	// var tmp = getParam("geo.boundsMinLong");
	// alert(tmp);
	
    //GLOBAL DATA SOURCE
    $scope.categories=_usualCategoriesDatas;
    
})
.controller('DechetCatSubCtrl', function($scope, $stateParams) {
    
    //GLOBAL DATA SOURCE
    $scope.selected_categorie_usuelle=$stateParams.code;
    $scope.dechets=_garbagesDatas;

})
.controller('DechetDetailCtrl', function($scope, $stateParams, $filter) {
    
    var dechet_code=$stateParams.code;    
    //On récupère le déchet qui correspondant au code 
    dechets=$filter('filter')(_garbagesDatas, {code : dechet_code});

    $scope.toggleObject = {item: -1};
    $scope.toggleObject2 = {item2: -1};

    //Le filter renvoie necessairement un Array donc on extrait le premier élément trouvé
    var dechet=dechets[0];
   
    //Array modes collectes (split de la chaine)
    var modesCollectes=dechet.modco.split(",");
   
    //RE-FILTER sur les modes de collecte
    var modesCollectesFilter=$filter('filter')(_collectModsDatas, 
        //CUSTOM INLINE FILTER
        function (value, index, fullarray) {    
                //Modes de collecte déchet           
                myindex=modesCollectes.indexOf(value.code);
                if (myindex >=0) return true;
                else return false;
        }
    );

    // CRN
    // Tableau des conseils (découpage de la chaine)
    if (dechet.cons!=null) {
    var conseils = dechet.cons.split(",");
   
    // RE-FILTER sur les conseils
    var conseilsFilter = $filter('filter')(
    	_advicesDatas, 
        // CUSTOM INLINE FILTER
        function (value, index, fullarray) {    
           // Conseils déchet           
           myindex=conseils.indexOf(value.code);
           if (myindex >=0) {
            return true;
          } else {
            return false;
          }
        }
    );
    }

    
   //SCOPE
   $scope.dechet=dechet; 
   $scope.modesCollecte=modesCollectesFilter;
   $scope.conseils=conseilsFilter;

})

.controller('FichesCtrl', function($scope, $stateParams) {
    
    //GLOBAL DATA SOURCE
    $scope.fiches=_infosDatas;

})
.controller('FichesDetailCtrl', function($scope, $stateParams, $filter) {
    
    var fiche_code=$stateParams.code;    
    //On récupère la fiche qui correspondant au code 
    fiches=$filter('filter')(_infosDatas, {code : fiche_code});
    
    //Le filter renvoie necessairement un Array donc on extrait le premier élément trouvé
    var fiche=fiches[0];
   
    //SCOPE
    $scope.fiche=fiche; 

})
.controller('StructuresCtrl', function($scope, ServiceStructures) {
     
    //SELECT Type de structures
    $scope.typeCollecte=ServiceStructures.getTypeCollecte();
    $scope.formSelected={ 
        
        type : $scope.typeCollecte[0], 
        searchKey : ''
    };
    $scope.results=[];

    $scope.onChangeForm = function() {

        $scope.results=ServiceStructures.search($scope.formSelected.type, $scope.formSelected.searchKey);      

    };
})
;