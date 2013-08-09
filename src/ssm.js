;(function (window, document, undefined) {
    "use strict";

    var ssm = {},
        states = [],
        debug = false,
        browserWidth = 0,
        currentState = null,
        resizeTimeout = 50,
        resizeTimer = null;

    var browserResizePre = function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(browserResize, resizeTimeout);
    };

    var browserResize = function () {
        var state = null,
            totalStates;

        totalStates = states.length;
        browserWidth = getWidth();

        for (var i = 0; i < totalStates; i++) {
            state = states[i];

            if (states[i].width >= browserWidth) {

                if (currentState !== null) {
                    if (currentState.id !== states[i].id) {
                        currentState.onLeave();
                        currentState = states[i];
                        currentState.onEnter();
                    }
                } else {
                    currentState = states[i];
                    currentState.onEnter();
                }

                states[i].onResize();
                break;
            }
        }

        if (debug) {
            document.getElementById('ssmDebug').innerHTML = browserWidth + 'px';
        }
    };

    //Enable a debug mode
    ssm.enableDebug = function () {
        debug = true;
        document.body.innerHTML += '<div id="ssmDebug" style="z-index: 99999999; position: fixed; bottom: 0px; right: 0px; width: 100px; line-height: 30px; font-size: 12px; background: #fff; border: 1px solid #000; text-align: center;">' + browserWidth + 'px</div>';

        return this;
    };

    //Add a new state
    ssm.addState = function (options) {
        var defaultOptions = {
            id: makeID(),
            width: 0,
            onEnter: function () {},
            onLeave: function () {},
            onResize: function () {}
        };

        options = mergeOptions(defaultOptions, options);
        //options.range = options.maxWidth - options.minWidth;

        states.push(options);

        states = sortByKey(states, 'width');

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

        //Find and remove the state from the array
    ssm.removeAllStates = function (stateId) {
        states = [];

        return this;
    };

    //Add multiple states from an array
    ssm.addStates = function (statesArray) {
        for (var i = statesArray.length - 1; i >= 0; i--) {
            ssm.addState(statesArray[i]);
        }

        return this;
    };

    ssm.getState = function(){
        return currentState;
    };

    //Change the timeout before firing the resize function
    ssm.setResizeTimeout = function (milliSeconds) {
        resizeTimeout = milliSeconds;
    };

    ssm.ready = function () {
        var state = null,
            totalStates = states.length;

        for (var i = 0; i < totalStates; i++) {
            state = states[i];

            if (states[i].width >= browserWidth) {
                currentState = states[i];
                currentState.onEnter();
                break;
            }
        }

        return this;
    };

    //Return an array of all the states
    ssm.states = function () {

        return states;
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
        if (self.innerHeight) {
            x = self.innerWidth;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            x = document.documentElement.clientWidth;
        } else if (document.body) {
            x = document.body.clientWidth;
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

    browserWidth = getWidth();

    //Attach event
    if (window.attachEvent) {
        window.attachEvent('onresize', browserResizePre);
    } else if (window.addEventListener) {
        window.addEventListener('resize', browserResizePre, true);
    } else {
        //The browser does not support Javascript event binding
    }

    //Expose Simple State Manager
    window.ssm = ssm;

    if (typeof window.define === "function" && window.define.amd) {
        window.define("ssm", [], function () {
            return window.ssm;
        });
    }


})(window, document);