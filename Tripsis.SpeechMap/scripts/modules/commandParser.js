define(["jquery", "logger"], function ($, logger) {

    // Set up commands
    var commandList = [];
    commandList.push("north");
    commandList.push("south");
    commandList.push("east");
    commandList.push("west");
    
    commandList.push("zoom in");
    commandList.push("zoom out");
    
    commandList.push("goto {location}");
    
    commandList.push("find me");

    function parse(command, callback) {

        command = $.trim(command).toLowerCase();
        var matchingCommand = "Sorry, command not recognised.",
            parameter = null;

        var parameterMatch = new RegExp("{.+}");

        for (var i = commandList.length - 1; i >= 0; i--) {
            var thisCommand = commandList[i];
            
            if (thisCommand.indexOf('{') > -1) {
                var parameterPart = parameterMatch.exec(thisCommand)[0];
                thisCommand = thisCommand.replace(parameterPart, "").trim();
                parameter = command.replace(thisCommand, "").trim();
            }
            
            if (command == thisCommand) {
                matchingCommand = thisCommand;
                break;
            }
            
            if (command[0] == thisCommand[0]) {
                matchingCommand = thisCommand;
            }
        }

        logger.log("Parsed command '" + command + "' as '" + matchingCommand + "'");
        callback(matchingCommand, parameter);
    }

    return {
        parse: parse,
        commands: commandList
    };

});