define(function() {

    var logToConsole = function() {
        console.log(arguments);
    };

    return {
        log: logToConsole
    };

});