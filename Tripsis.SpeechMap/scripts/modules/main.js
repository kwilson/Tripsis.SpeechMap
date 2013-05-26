define(["jquery", "speechRecognition", "commandParser", "mapping", "logger"], function ($, speechRecognition, commandParser, mapping, logger) {

    function newCommandHandler(command) {
        logger.log("Command: " + command);

        switch (command.toLowerCase()) {
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

        default:
        }
    }

    $(function() {

        logger.log("App init");

        mapping.create("map");
        var recogniser = speechRecognition.start();

        recogniser.done(newCommandHandler);

    });
});

