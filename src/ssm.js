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

    var resizeTimeout = 25;

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
        
        //Handle entering a state
        enterState: function() {
            fireAllMethodsInArray(this.options.onFirstRun);
            fireAllMethodsInArray(this.options.onEnter);
            this.options.onFirstRun = [];
            this.active = true;
        },

        //Handle leaving a state
        leaveState: function() {
            fireAllMethodsInArray(this.options.onLeave);
            this.active = false;
        },

        //Handle the user resizing the browser
        resizeState: function() {
            fireAllMethodsInArray(this.options.onResize);
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

            window.addEventListener("resize", debounce(this.resizeBrowser.bind(this), resizeTimeout), true);
        
            return this;
        },

        addStates: function (statesArray) {
            for (var i = statesArray.length - 1; i >= 0; i--) {
                this.addState(statesArray[i]);
            }

            return this;
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

        getStates: function() {
            var idCount = null, returnArr = [];

            if (typeof(idArr) === "undefined") {
                return this.states;
            }
            else {
                idCount = idArr.length;
                
                for (var i = 0; i < idCount; i++) {
                    returnArr.push(this.getState(idArr[i]));
                }

                return returnArr;
            }
        },

        removeState: function (id) {
            for (var i = this.states.length - 1; i >= 0; i--) {
                var state = this.states[i];

                if (state.id === id) {
                    state.destroy();
                    this.states.splice(i, 1);
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
        },

        removeConfigOption: function(name){
            var configOptions = State.prototype.configOptions;

            for (var i = configOptions.length - 1; i >= 0; i--) {
                if (configOptions[i].name === name) {
                    configOptions.splice(i, 1);
                }
            }

            State.prototype.configOptions = configOptions;
        },

        getConfigOption: function(name){
            var configOptions = State.prototype.configOptions;

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
        },

        resizeBrowser: function() {
            var activeStates = filterStates(this.states, 'active', true);
            var len = activeStates.length;

            for (var i = 0; i < len; i++) {
                activeStates[i].resizeState();
            }
        }
    };

    //Utility functions

    function filterStates(states, key, value) {
        var len = states.length;
        var returnStates = [];

        for (var i = 0; i < len; i++) {
            var state = states[i];

            if (state[key] && state[key] === value) {
                returnStates.push(state);
            }
        }

        return returnStates;
    }

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

    //
    // David Walsh's Debounce - http://davidwalsh.name/javascript-debounce-function
    //

    function debounce(func, wait, immediate) {
        var timeout;
        
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    return new StateManager();
});
