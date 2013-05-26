define(["jquery", "speechRecognition", "commandParser", "mapping", "logger"], function ($, speechRecognition, commandParser, mapping, logger) {

    var commandDisplay;

    function newCommandHandler(command) {
        logger.log("Command: " + command);

        // Show command
        command = command.toLowerCase();
        commandDisplay.stop().show().html(command);
        commandDisplay.fadeOut(5000);

        // Run command
        switch (command) {
            case "up":
            case "north":
                logger.log("pan north");
                mapping.panNorth();
                return;
                
            case "down":
            case "south":
                logger.log("pan south");
                mapping.panSouth();
                return;
                
            case "west":
            case "left":
                logger.log("pan west");
                mapping.panWest();
                return;
                
            case "right":
            case "east":
                logger.log("pan east");
                mapping.panEast();
                return;
                
            case "zoom in":
                logger.log("zoom in");
                mapping.zoomIn();
                return;
                
            case "zoom out":
                logger.log("zoom out");
                mapping.zoomOut();
                return;

        default:
        }
    }

    $(function() {

        logger.log("App init");
        
        // Add required DOM elements
        var body = $("body");
        body.append("<div id='map' />");

        commandDisplay = $("<div id='command' />");
        body.append(commandDisplay);

        // Create map
        mapping.create("map");
        
        // Start speech recognition
        var recogniser = speechRecognition.start();
        recogniser.done(newCommandHandler);
    });
});

