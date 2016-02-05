/* CARTE */

angular.module('starter.controllers').controller('CarteCtrl', function($scope, ServiceStructures, leafletData, leafletMapEvents, leafletBoundsHelpers) {
       
	var bounds = leafletBoundsHelpers.createBoundsFromArray([
                [ 43.61194, 3.877222 ],
                [ 43.61194, 3.877222 ]
            ]);   
	   
    angular.extend($scope, {
        center: {
            lat: 43.61194,
            lng: 3.877222,
            zoom: 12
        },
        
        layers: {
                    baselayers: {
                        openStreetMap: {
                            name: 'Montpellier',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                    },
                    overlays: {
                        container: {
                            type: 'group',
                            name: 'Conteneurs',
                            visible: true
                        }
                    }
        },
        
        position: {
            lat: 47.2180,
            lng: -1.5527
        },
		
		//bounds: bounds,
		
        paths: {}
      
    });
    
    //CONTENEURS
    $scope.markers = ServiceStructures.getLeafletContainers($scope.center); 
    
    var leafletEventName = 'leafletDirectiveMap.moveend';
    $scope.$on(leafletEventName, function(event) {
            //$scope.eventDetected = event.name;                     
            leafletData.getMap().then(function(map) {
                
                   $scope.markers = ServiceStructures.getLeafletContainers(map.getCenter()); 
				   
                   var circle= {
                        type: "circle",
                        radius: 500,
                        latlngs: map.getCenter(),
                        color : 'green',
			fillColor : '#c2e47e',
			fillOpacity : 0.3,
                        weight : 3
                   };
                   $scope.paths = {};
                   //$scope.paths['circle'] = circle;
                   
            });
            
    });
    
});