﻿define(["logger", "async!https://maps.googleapis.com/maps/api/js?sensor=false"], function (logger) {

    var map,
        panDistance = 300;
       
    function createMap(elementId) {
        var mapDiv = document.getElementById(elementId);
        map = new google.maps.Map(mapDiv, {
            center: new google.maps.LatLng(55.971032, -3.967317),
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
    
    function zoomIn() {
        var currentZoom = map.getZoom();
        map.setZoom(currentZoom + 1);
    }
    
    function zoomOut() {
        var currentZoom = map.getZoom();
        map.setZoom(currentZoom - 1);
    }

    return {
        create: createMap,
        panNorth: panNorth,
        panSouth: panSouth,
        panEast: panEast,
        panWest: panWest,
        zoomIn: zoomIn,
        zoomOut: zoomOut
    };

});