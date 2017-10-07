export function filterStates(states, key, value) {
    return states.filter((state) => {
        return state[key] && state[key] === value;
    });
}

export function makeID() {
    return Math.random().toString(36).substr(2, 9);
}

export function fireAllMethodsInArray(arr) {
    arr.forEach(method => method());
}

export function funcToArray(func) {
    return typeof func === 'function' ? [func] : func;
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