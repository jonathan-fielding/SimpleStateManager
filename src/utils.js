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

export function debounce(func) {
    var timeout;
    
    return function() {
        var args = arguments;
        var later = () => {
            timeout = null;
            func.apply(this, args);
        };

        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout =  window.requestAnimationFrame(later);
    };
}