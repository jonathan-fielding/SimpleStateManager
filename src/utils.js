export function filterStates(states, key, value) {
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

export function mergeOptions(obj1, obj2) {
    var obj3 = {};

    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }

    for (var attrname2 in obj2) {
        obj3[attrname2] = obj2[attrname2];
    }

    return obj3;
}

export function makeID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function fireAllMethodsInArray(arr) {
    var arrLength = arr.length;

    for (var i = 0; i < arrLength; i++) {
        arr[i]();
    }
}

export function funcToArray(func) {
    if (typeof func === 'function') {
        return [func];
    }
    else {
        return func;
    }
}

export function debounce(func, wait, immediate) {
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