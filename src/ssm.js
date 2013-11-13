;(function (window, document, undefined) {
    "use strict";

    var ssm = {},
        states = [],
        debug = false,
        browserWidth = 0,
        currentStates = [],
        resizeTimeout = 10,
        resizeTimer = null,
        stateCounter = 0,
        configOptions = [];

    var browserResizeDebounce = function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(browserResizeWrapper, resizeTimeout);
    };

    //Added wrapper for the resize method
    var browserResizeWrapper = function() {
        browserWidth = getWidth();
        browserResize(browserWidth);
    };

    var browserResize = function (localBrowserWidth) {
        var state = null,
            totalStates,
            leaveMethods = [],
            resizeMethods = [],
            enterMethods = [];

        totalStates = states.length;

        for (var i = 0; i < totalStates; i++) {
            if(localBrowserWidth >= states[i].minWidth && localBrowserWidth <= states[i].maxWidth){
                
                if(objectInArray(currentStates, states[i])){
                    resizeMethods.push(states[i].onResize);
                }
                else{
                    currentStates.push(states[i]);
                    enterMethods.push(states[i].onEnter);
                }
            }
            else{
                if(objectInArray(currentStates, states[i])){
                    leaveMethods.push(states[i].onLeave);
                    currentStates = removeObjectInArray(currentStates,states[i]);
                }
            }
        };

        fireAllMethodsInArray(leaveMethods);
        fireAllMethodsInArray(enterMethods);
        fireAllMethodsInArray(resizeMethods);
    };

    ssm.browserResize = browserResize;

    ssm.getBrowserWidth = function(){
        return browserWidth;
    };

    //Add a new state
    ssm.addState = function (options) {
        //Setting sensible defaults for a state
        //Max width is set to 99999 for comparative purposes, is bigger than any display on market
        var defaultOptions = {
            id: makeID(),
            minWidth: 0,
            maxWidth: 99999,
            onEnter: function () {},
            onLeave: function () {},
            onResize: function () {}
        };

        //Merge options with defaults
        options = mergeOptions(defaultOptions, options);

        //Add state to the master states array
        states.push(options);

        //Sort 
        states = sortByKey(states, 'minWidth');

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
    ssm.removeAllStates = function (stateId) {
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
            };

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
        for (var i = configOptions.length - 1; i >= 0; i--) {
            if(configOptions[i].name === name){
                return configOptions[i];
            }
        };
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

        //Attach event for resizing
        if (window.attachEvent) {
            window.attachEvent('onresize', browserResizeDebounce);
        } else if (window.addEventListener) {
            window.addEventListener('resize', browserResizeDebounce, true);
        } else {
            //The browser does not support Javascript event binding which is required by SimpleStateManager
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


    var getWidth = function () {
        var x = 0;
        if (typeof(document.body.clientWidth) == 'number') {
            // newest gen browsers
            x = document.body.clientWidth;
        }
        else if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            x = window.innerWidth;
        }
        else if( document.documentElement && document.documentElement.clientWidth ) {
            //IE 6+ in 'standards compliant mode'
            x = document.documentElement.clientWidth;
        }

        return x;
    };


    var mergeOptions = function (obj1, obj2) {
        var obj3 = {};

        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }

        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }

        return obj3;
    };


    var sortByKey = function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };

    //Method to get a state based on the ID
    var getStateByID = function(id){
        for (var i = states.length - 1; i >= 0; i--) {
            if(states[i].id === id){
                return states[i];
            }
        };
    };

    var objectInArray = function(arr, obj){
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] === obj){
                return true;
                break;
            }
        };
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
        };
    }

    //Expose Simple State Manager
    window.ssm = ssm;

    if (typeof window.define === "function" && window.define.amd) {
        window.define("ssm", [], function () {
            return window.ssm;
        });
    }

})(window, document);