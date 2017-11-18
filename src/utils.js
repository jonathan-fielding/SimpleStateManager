export function filterStates(states, key, value) {
    return states.filter(state => state[key] && state[key] === value);
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
    let timeout;

    return (...args) => {
        const later = () => {
            timeout = null;
            func.apply(this, args);
        };

        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(later);
    };
}
