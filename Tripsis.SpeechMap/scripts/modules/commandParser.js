define(["jquery", "logger"], function ($, logger) {

    // Set up commands
    var commandList = [];
    commandList.push("north");
    commandList.push("south");
    commandList.push("east");
    commandList.push("west");
    
    commandList.push("zoom in");
    commandList.push("zoom out");

    function parse(command, callback) {

        command = $.trim(command).toLowerCase();
        var matchingCommand = "Sorry, command not recognised.";

        for (var i = commandList.length - 1; i >= 0; i--) {
            var thisCommand = commandList[i];
            
            if (command == thisCommand) {
                matchingCommand = thisCommand;
                break;
            }
            
            if (command[0] == thisCommand[0]) {
                matchingCommand = thisCommand;
            }
        }

        logger.log("Parsed command '" + command + "' as '" + matchingCommand + "'");
        callback(matchingCommand);
    }

    return {
        parse: parse,
        commands: commandList
    };

});