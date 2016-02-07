angular.module('starter.services', [])

.factory('ServiceStructures', function($filter) {
  
  //GLOBAL DATA
  var structuresData = _structuresDatas;
   
  var structureCollecteType = [{
        name : 'Tous',
        value : '.*'
    }, {
        name : "Déchèteries / Ecopoints",
        value : "modco_decheterie|modco_ecopoint"
    }, {
        name : "Encombrants",
        value : "modco_encombrants_resume"
    }, {
        name : "Réemploi",
        value : "smco_reemp"
    }, {
        name : "Vente vrac",
        value : "ventevrac"
    }];

  //Retourne Objet L.icon (Leaflet)
  function iconMapper(structure) {
           
      var iconTypeMap = {};      
      iconTypeMap["Conteneur verre"] = 'resources/images/montpellier/marker_verre.png';
      iconTypeMap["Conteneur verre, "] = 'resources/images/montpellier/marker_verre.png';
      iconTypeMap["Conteneurs verre"] = 'resources/images/montpellier/marker_verre.png';
      iconTypeMap["Conteneurs : verre, papier-carton"] = 'resources/images/montpellier/marker_verre_carton.png';    
      iconTypeMap["Conteneur papier-carton"] = 'resources/images/montpellier/marker_verre_carton.png';
      iconTypeMap["Conteneurs : verre, papier-carton, plastique"] = 'resources/images/montpellier/marker_verre_carton_plastique.png';
      iconTypeMap["Conteneurs : papier-carton, plastique"] = 'resources/images/montpellier/marker_verre_carton_plastique.png';
      iconTypeMap["Conteneurs : verre, plastique"] = 'resources/images/montpellier/marker_verre_carton_plastique.png';
      iconTypeMap["Conteneur verre, papier, plastique"] = 'resources/images/montpellier/marker_verre_carton_plastique.png';
      iconTypeMap["Conteneur verre, papier"] = 'resources/images/montpellier/marker_verre_carton.png';
      
      //LISTE des différentes icônes
      var iconDefault={};     
      var iconBase= {
                    //iconUrl: '/resources/images/montpellier/marker_verre.png',
                    //shadowUrl: '/resources/images/montpellier/leaf-shadow.png',
                    iconSize:     [32, 48], // size of the icon
                    shadowSize:   [32, 48], // size of the shadow
                    iconAnchor:   [15, 48], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 30],  // the same for the shadow
                    popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
      };
      
      if (structure.type in iconTypeMap) {
          
          iconCustom=iconBase;
          iconCustom.iconUrl=iconTypeMap[structure.type];
          return iconCustom;
      } 
      else return iconDefault;
      
  };

  return {
        
    search: function(typeParam, searchkeyParam) {
        
        console.time("search_structures");
        var stTypeRegexp = new RegExp(typeParam.value);
        var stSearchRegexp = new RegExp(Transliteration(searchkeyParam), 'ig');

        var results=$filter('filter')(structuresData, 
        
            //CUSTOM FILTER
            function (item, index, fullarray) {
      
                //Analyse du type uniquement
                if (searchkeyParam == '') {
                    
                    return stTypeRegexp.test(item.modesCollecte);
                    
                }
                //Analyse type et mot-clé
                else {
                    
                    var nomNormalize=Transliteration(item.nom);
                    
                    //Mots-clés sur la donnée ??
                    var keywordsNormalize='';                    
                    if (typeof item.mots_cles !== "undefined") keywordsNormalize=Transliteration(item.mots_cles);
                    
                    return stTypeRegexp.test(item.modesCollecte) && (stSearchRegexp.test(nomNormalize) || stSearchRegexp.test(keywordsNormalize));
                    
                }          
                
            }
        );

        console.timeEnd("search_structures");  

        return results;
    },
    
    getTypeCollecte : function() {
        
        return structureCollecteType;
        
    },
    
    /* Retourne tous les conteneurs (au format compatible Angular Leaflet)
     * car les conteneurs sont uniquement destinés à être affichés sur la carte Leaflet
       GLOBAL DATA _containersDatas    
      
      location = { lat: 47.22, lng:  -1.52}
      
    */   
    getLeafletContainers : function(centerLocation) {      

        var leafletContainers={};
        //DISTANCE EN METRES MAX
        var maxDistance=9000;
        
        var latlngCenterLocation = L.latLng(centerLocation.lat, centerLocation.lng);  
       
        for (var i = 0; i < _containersDatas.length; i++) {  //_containersDatas.length
        
            //SKIP INVALID CONTAINER
            var container=_containersDatas[i];
            if (container.length === 0 || container.type == '') continue;
        
            popuptext='<b>' + container.type + '</b><br/>';
            if (container.nom) {
		popuptext = popuptext + container.nom + '<br/>';
            };
            
            if (container.adresseTemp) {
		popuptext = popuptext + container.adresseTemp + '<br/>';
            }
        
            //Mapping data MTN => data Angular Leaflet
            leafletContainer={
                 lat: parseFloat(container.latitude),  //IMPORTANT : données origine de type string !
                 lng: parseFloat(container.longitude), //IMPORTANT : données origine de type string !                
                 message: popuptext,
                 group: 'Conteneurs',
                 icon: iconMapper(container)
            };
            
            //AJOUT CONTAINER SSI dans le cercle autorisé (limite en mètres)
            
            currentPoint=L.latLng(leafletContainer.lat, leafletContainer.lng);
            if (latlngCenterLocation.distanceTo(currentPoint) <= maxDistance)
            {
                leafletContainers[container.code]=leafletContainer;
            }
        
        }
   
        return leafletContainers;
   
    }
    
  };
});
