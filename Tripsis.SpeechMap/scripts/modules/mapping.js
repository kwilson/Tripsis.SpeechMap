define(["jquery", "logger", "async!https://maps.googleapis.com/maps/api/js?sensor=false"], function ($, logger) {

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
    
    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var newPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setZoom(15);
                map.panTo(newPosition);
            });
        }
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
    
    function gotoLocation(location) {
        var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&sensor=false";
        var request = $.ajax({
            dataType: "json",
            url: requestUrl
        });

        request.done(function(data) {
            if (data.results && data.results.length > 0) {
                var location = data.results[0].geometry.location;
                var newPosition = new google.maps.LatLng(location.lat, location.lng);
                map.setZoom(15);
                map.panTo(newPosition);
            }
        });
    }

    return {
        create: createMap,
        panNorth: panNorth,
        panSouth: panSouth,
        panEast: panEast,
        panWest: panWest,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        geolocate: geolocate,
        gotoLocation: gotoLocation
    };

});