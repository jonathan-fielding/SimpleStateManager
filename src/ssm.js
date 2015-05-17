/*global window document clearTimeout setTimeout */

(function (window, document, undefined, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(window, document, undefined);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    window.ssm = factory(window, document, undefined);
  }
})(window, document, undefined, function (window, document, undefined) {
    "use strict";

    var isReady = false,
        ssm = {},
        states = [],
        browserWidth = 0,
        currentStates = [],
        resizeTimeout = 10,
        resizeTimer = null,
        configOptions = [];

    var browserResizeDebounce = function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(browserResize, resizeTimeout);
    };

    var browserResize = function () {
        for (var i = currentStates.length - 1; i >= 0; i--) {
            fireAllMethodsInArray(currentStates[i].onResize);
        }
    };

    ssm.browserResize = browserResize;

    //Add a new state
    ssm.addState = function (options) {
        //Setting sensible defaults for a state
        var defaultOptions = {
            id: makeID(),
            query: '',
            onEnter: [],
            onLeave: [],
            onResize: [],
            onFirstRun: []
        };

        //Merge options with defaults
        options = mergeOptions(defaultOptions, options);

        //Migrate methods into an array
        if(typeof options.onEnter === "function"){
            options.onEnter = [options.onEnter];
        }

        if(typeof options.onLeave === "function"){
            options.onLeave = [options.onLeave];
        }

        if(typeof options.onResize === "function"){
            options.onResize = [options.onResize];
        }

        if(typeof options.onFirstRun === "function"){
            options.onFirstRun = [options.onFirstRun];
        }

        //Add state to the master states array
        states.push(options);

        return this;
    };

    //Allow updating of an already added state
    ssm.updateState = function (stateId, options) {
        for (var i = states.length - 1; i >= 0; i--) {
            if (states[i].id === stateId) {
                states[i] = mergeOptions(states[i], options);
            }
        }

        return this;
    };

    //Find and remove the state from the array
    ssm.removeState = function (stateId) {
        for (var i = states.length - 1; i >= 0; i--) {
            if (states[i].id === stateId) {
                states.splice(i, 1);
            }
        }

        return this;
    };

    //Remove multiple states from an array
    ssm.removeStates = function (statesArray) {
        for (var i = statesArray.length - 1; i >= 0; i--) {
            ssm.removeState(statesArray[i]);
        }

        return this;
    };

    //Find and remove the state from the array
    ssm.removeAllStates = function () {
        states = currentStates = [];

        return this;
    };

    //Add multiple states from an array
    ssm.addStates = function (statesArray) {
        for (var i = statesArray.length - 1; i >= 0; i--) {
            ssm.addState(statesArray[i]);
        }

        return this;
    };

    ssm.getStates = function(idArr){
        var idCount = null, returnArr = [];

        if(typeof(idArr) === "undefined"){
            return states;
        }
        else{
            idCount = idArr.length;
            
            for (var i = 0; i < idCount; i++) {
                returnArr.push(getStateByID(idArr[i]));
            }

            return returnArr;
        }
    };

    ssm.addConfigOption = function(options){
        var defaultOptions = {
            name: "",
            test: null
        };

        //Merge options with defaults
        options = mergeOptions(defaultOptions, options);

        if(options.name !== "" && options.test !== null){
            configOptions.push(options);
        }
    };

    ssm.getConfigOption = function(name){
        if(typeof name === "string"){
            for (var i = configOptions.length - 1; i >= 0; i--) {
                if(configOptions[i].name === name){
                    return configOptions[i];
                }
            }
        }
        else{
            return configOptions;
        }
    };

    ssm.removeConfigOption = function(name){
        for (var i = configOptions.length - 1; i >= 0; i--) {
            if (configOptions[i].name === name) {
                configOptions.splice(i, 1);
            }
        }
    };

    ssm.isActive = function(name){
        for (var i = 0; i < currentStates.length; i++) {
            if(currentStates[i].id === name){
                return true;
            }
        }
        
        return false;
    };

    ssm.getCurrentStates = function(){
        return currentStates;
    };

    //Change the timeout before firing the resize function
    ssm.setResizeTimeout = function (milliSeconds) {
        resizeTimeout = milliSeconds;
    };

    //Change the timeout before firing the resize function
    ssm.getResizeTimeout = function () {
        return resizeTimeout;
    };

    ssm.ready = function () {
        //Update browser width
        browserWidth = getWidth();

        if(isReady === false){
            //Attach event for resizing
            if (window.attachEvent) {
                window.attachEvent("onresize", browserResizeDebounce);
            } else if (window.addEventListener) {
                window.addEventListener("resize", browserResizeDebounce, true);
            }

            isReady = true;
        }

        browserResize(browserWidth);

        return this;
    };

    var makeID = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };


    var mergeOptions = function (obj1, obj2) {
        var obj3 = {};

        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }

        for (var attrname2 in obj2) {
            obj3[attrname2] = obj2[attrname2];
        }

        return obj3;
    };

    //Method to get a state based on the ID
    var getStateByID = function(id){
        for (var i = states.length - 1; i >= 0; i--) {
            if(states[i].id === id){
                return states[i];
            }
        }
    };

    var objectInArray = function(arr, obj){
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] === obj){
                return true;
            }
        }
    };

    var removeObjectInArray = function(arr,obj){
        var length = arr.length;

        for (var i = 0; i < length; i++) {
            if (arr[i] === obj) {
                arr.splice(i, 1);
            }
        }

        return arr;
    };

    var fireAllMethodsInArray = function(arr){
        var arrLength = arr.length;

        for (var i = 0; i < arrLength; i++) {
            arr[i]();
        }
    };

    return ssm;
});
