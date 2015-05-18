/*global window document clearTimeout setTimeout */

(function (window, document, undefined, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
        return factory(window, document, undefined);
    });
  }
  else if (typeof exports === 'object') {
    module.exports = factory;
  }
  else {
    window.ssm = factory(window, document, undefined);
  }
})(window, document, undefined, function (window, document, undefined) {
    'use strict';

    var resizeTimeout = 10;

    //
    // State Constructor
    // When the user uses addState state manager will create instances of a State
    //

    function State(options) {
        this.id = options.id || makeID();
        this.query = options.query || '';

        // These are exposed as part of the state, not options so delete before
        // we merge these into default options.
        delete options.id;
        delete options.query;

        var defaultOptions = {
            onEnter: [],
            onLeave: [],
            onResize: [],
            onFirstRun: []
        };

        //Merge options with defaults to make the state
        this.options = mergeOptions(defaultOptions, options);

        //Migrate methods into an array, this is to enable future functionality of adding extra methods to an existing state
        if(typeof this.options.onEnter === "function"){
            this.options.onEnter = [this.options.onEnter];
        }

        if(typeof this.options.onLeave === "function"){
            this.options.onLeave = [this.options.onLeave];
        }

        if(typeof this.options.onResize === "function"){
            this.options.onResize = [this.options.onResize];
        }

        if(typeof this.options.onFirstRun === "function"){
            this.options.onFirstRun = [this.options.onFirstRun];
        }

        this.init();
    }

    State.prototype = {
        init: function() {
            this.test = window.matchMedia(this.query);

            if (this.test.matches) {
                this.enterState();
            }

            this.listener = this.test.addListener(function(test){
                if (test.matches) {
                    this.enterState();
                }
                else {
                    this.leaveState();
                }
            }.bind(this));
        },
        
        enterState: function() {
            fireAllMethodsInArray(this.options.onFirstRun);
            fireAllMethodsInArray(this.options.onEnter);
            this.options.onFirstRun = [];
            this.active = true;
        },

        leaveState: function() {
            fireAllMethodsInArray(this.options.onLeave);
            this.active = false;
        },

        //When the StateManager removes a state we want to remove the event listener
        destroy: function() {
            this.test.removeListener(this.listener);
        },

        //An array of avaliable config options, this can be pushed to by the State Manager
        configOptions: [

        ]
    };  

    //State Manager Constructor

    function StateManager(options) {
        this.states = [];
        this.resizeTimer = null;
        this.configOptions = [];
    }

    StateManager.prototype = {
        addState: function(options) {
            this.states.push(new State(options));
        },

        getState: function(id) {
            for (var i = this.states.length - 1; i >= 0; i--) {
                var state = this.states[i];

                if(state.id === id){
                    return state;
                }
            }

            return this;
        },

        removeState: function (id) {
            for (var i = states.length - 1; i >= 0; i--) {
                var state = states[i];

                if (state.id === id) {
                    state.destroy();
                    states.splice(i, 1);
                }
            }

            return this;
        },

        removeAllStates: function() {
            for (var i = this.states.length - 1; i >= 0; i--) {
                var state = this.states[i];
                state.destroy();
            }

            this.states = [];
        },

        addConfigOption: function(options){
            var defaultOptions = {
                name: '',
                test: null,
                when: 'resize'
            };

            //Merge options with defaults
            options = mergeOptions(defaultOptions, options);

            if(options.name !== '' && options.test !== null){
                State.prototype.configOptions.push(options);
            }
        }
    };

    //Utility functions

    function mergeOptions(obj1, obj2) {
        var obj3 = {};

        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }

        for (var attrname2 in obj2) {
            obj3[attrname2] = obj2[attrname2];
        }

        return obj3;
    }

    function makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    function fireAllMethodsInArray(arr) {
        var arrLength = arr.length;

        for (var i = 0; i < arrLength; i++) {
            arr[i]();
        }
    }

    function funcToArray(func) {
        if (typeof func === 'function') {
            return [func];
        }
        else {
            return func;
        }
    }

    // ssm.browserResize = browserResize;

    // //Add a new state
    // ssm.addState = function (options) {
    //     //Setting sensible defaults for a state
    //     var defaultOptions = {
    //         id: makeID(),
    //         query: '',
    //         onEnter: [],
    //         onLeave: [],
    //         onResize: [],
    //         onFirstRun: []
    //     };

    //     //Merge options with defaults to make the state
    //     options = mergeOptions(defaultOptions, options);

    //     var state = new State(options);

    //     //Migrate methods into an array, this is to enable future functionality of adding extra methods to an existing state
    //     if(typeof state.onEnter === "function"){
    //         state.onEnter = [state.onEnter];
    //     }

    //     if(typeof state.onLeave === "function"){
    //         state.onLeave = [state.onLeave];
    //     }

    //     if(typeof state.onResize === "function"){
    //         state.onResize = [state.onResize];
    //     }

    //     if(typeof state.onFirstRun === "function"){
    //         state.onFirstRun = [state.onFirstRun];
    //     }

    //     window.matchMedia(options.query).addListener(function(event){
    //         if (event.match) {
    //             fireAllMethodsInArray(options.onEnter);
    //         }
    //         else {

    //         }
    //     });

    //     //Add state to the master states array
    //     states.push(options);

    //     return this;
    // };

    // //Allow updating of an already added state
    // ssm.updateState = function (stateId, options) {
    //     for (var i = states.length - 1; i >= 0; i--) {
    //         if (states[i].id === stateId) {
    //             states[i] = mergeOptions(states[i], options);
    //         }
    //     }

    //     return this;
    // };

    // //Find and remove the state from the array
    // ssm.removeState = function (stateId) {
    //     for (var i = states.length - 1; i >= 0; i--) {
    //         if (states[i].id === stateId) {
    //             states.splice(i, 1);
    //         }
    //     }

    //     return this;
    // };

    // //Remove multiple states from an array
    // ssm.removeStates = function (statesArray) {
    //     for (var i = statesArray.length - 1; i >= 0; i--) {
    //         ssm.removeState(statesArray[i]);
    //     }

    //     return this;
    // };

    // //Find and remove the state from the array
    // ssm.removeAllStates = function () {
    //     states = currentStates = [];

    //     return this;
    // };

    // //Add multiple states from an array
    // ssm.addStates = function (statesArray) {
    //     for (var i = statesArray.length - 1; i >= 0; i--) {
    //         ssm.addState(statesArray[i]);
    //     }

    //     return this;
    // };

    // ssm.getStates = function(idArr){
    //     var idCount = null, returnArr = [];

    //     if(typeof(idArr) === "undefined"){
    //         return states;
    //     }
    //     else{
    //         idCount = idArr.length;
            
    //         for (var i = 0; i < idCount; i++) {
    //             returnArr.push(getStateByID(idArr[i]));
    //         }

    //         return returnArr;
    //     }
    // };

    // ssm.addConfigOption = function(options){
    //     var defaultOptions = {
    //         name: "",
    //         test: null
    //     };

    //     //Merge options with defaults
    //     options = mergeOptions(defaultOptions, options);

    //     if(options.name !== "" && options.test !== null){
    //         configOptions.push(options);
    //     }
    // };

    // ssm.getConfigOption = function(name){
    //     if(typeof name === "string"){
    //         for (var i = configOptions.length - 1; i >= 0; i--) {
    //             if(configOptions[i].name === name){
    //                 return configOptions[i];
    //             }
    //         }
    //     }
    //     else{
    //         return configOptions;
    //     }
    // };

    // ssm.removeConfigOption = function(name){
    //     for (var i = configOptions.length - 1; i >= 0; i--) {
    //         if (configOptions[i].name === name) {
    //             configOptions.splice(i, 1);
    //         }
    //     }
    // };

    // ssm.isActive = function(name){
    //     for (var i = 0; i < currentStates.length; i++) {
    //         if(currentStates[i].id === name){
    //             return true;
    //         }
    //     }
        
    //     return false;
    // };

    // ssm.getCurrentStates = function(){
    //     return currentStates;
    // };

    // //Change the timeout before firing the resize function
    // ssm.setResizeTimeout = function (milliSeconds) {
    //     resizeTimeout = milliSeconds;
    // };

    // //Change the timeout before firing the resize function
    // ssm.getResizeTimeout = function () {
    //     return resizeTimeout;
    // };

    // ssm.ready = function () {
    //     //Update browser width

    //     if(isReady === false){
    //         //Attach event for resizing
    //         if (window.attachEvent) {
    //             window.attachEvent("onresize", browserResizeDebounce);
    //         } else if (window.addEventListener) {
    //             window.addEventListener("resize", browserResizeDebounce, true);
    //         }

    //         isReady = true;
    //     }

    //     return this;
    // };

    // var makeID = function () {
    //     var text = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //     for (var i = 0; i < 10; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     return text;
    // };

    // var mergeOptions = function (obj1, obj2) {
    //     var obj3 = {};

    //     for (var attrname in obj1) {
    //         obj3[attrname] = obj1[attrname];
    //     }

    //     for (var attrname2 in obj2) {
    //         obj3[attrname2] = obj2[attrname2];
    //     }

    //     return obj3;
    // };

    // //Method to get a state based on the ID
    // var getStateByID = function(id){
    //     for (var i = states.length - 1; i >= 0; i--) {
    //         if(states[i].id === id){
    //             return states[i];
    //         }
    //     }
    // };

    // var objectInArray = function(arr, obj){
    //     for (var i = 0; i < arr.length; i++) {
    //         if(arr[i] === obj){
    //             return true;
    //         }
    //     }
    // };

    // var removeObjectInArray = function(arr,obj){
    //     var length = arr.length;

    //     for (var i = 0; i < length; i++) {
    //         if (arr[i] === obj) {
    //             arr.splice(i, 1);
    //         }
    //     }

    //     return arr;
    // };

    // var fireAllMethodsInArray = function(arr){
    //     var arrLength = arr.length;

    //     for (var i = 0; i < arrLength; i++) {
    //         arr[i]();
    //     }
    // };

    // var browserResizeDebounce = function () {
    //     clearTimeout(resizeTimer);
    //     resizeTimer = setTimeout(browserResize, resizeTimeout);
    // };

    // var browserResize = function () {
    //     for (var i = currentStates.length - 1; i >= 0; i--) {
    //         fireAllMethodsInArray(currentStates[i].onResize);
    //     }
    // };

    return new StateManager();
});
