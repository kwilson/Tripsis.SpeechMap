define(["logger", "async!https://maps.googleapis.com/maps/api/js?sensor=false"], function (logger) {

    var map,
        panDistance = 300;
       
    function createMap(elementId) {
        var mapDiv = document.getElementById(elementId);
        map = new google.maps.Map(mapDiv, {
            center: new google.maps.LatLng(37.4419, -122.1419),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControl: true,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            }
        });
    }
    
    function panNorth() {
        map.panBy(0, 0 - panDistance);
    }
    
    function panSouth() {
        map.panBy(0, panDistance);
    }
    
    function panEast() {
        map.panBy(panDistance, 0);
    }
    
    function panWest() {
        map.panBy(0 - panDistance, 0);
    }

    return {
        create: createMap,
        panNorth: panNorth,
        panSouth: panSouth,
        panEast: panEast,
        panWest: panWest
    };

});