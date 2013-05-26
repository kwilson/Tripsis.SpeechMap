﻿define(["commandParser", "logger"], function (commandParser, logger) {
    
    if (!webkitSpeechRecognition) {
        alert("Sorry, speech recognition is not available in your browser.");
    }
    
    // Set up globals
    var recognition, interimCallback, finalCallback;
    setUpRecogniser();
    
    function setUpRecogniser() {
        logger.log("Creating recogniser");
        recognition = new webkitSpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-GB";

        // Grammars
        for (var i = commandParser.commands.length - 1; i >= 0; i--) {
            recognition.grammars.addFromString(commandParser.commands[i]);            
        }

        recognition.onend = function(e) {
            recognition.start();
        };

        recognition.onerror = function(e) {
            logger.log("Speech recognition error.", e);
        };

        logger.log(recognition);
    }

    function startListening() {
        recognition.start();
        recognition.onresult = resultHandler;
        return eventHandler;
    }
    
    function stopListening() {
        recognition.stop();
    }

    function resultHandler(event) {
        var interimTranscript = '';
        var finalTranscript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                logger.log(event.results[i]);
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (interimCallback) {
            commandParser.parse(interimTranscript, interimCallback);
        }

        if (finalCallback) {
            commandParser.parse(finalTranscript, finalCallback);
        }
    }

    var eventHandler = {
        interim: function(callback) {
            interimCallback = callback;
        },
        
        done: function(callback) {
            if (callback) {
                finalCallback = callback;
            }
        }
    };

    return {
        start: startListening,
        stop: stopListening
    };

});