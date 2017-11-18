import {
    fireAllMethodsInArray,
    makeID,
} from './utils';

const configOptions = [];
let stateChangeMethod = function () { };

export default class State {
    constructor(options) {
        this.id = options.id || makeID();
        this.query = options.query || 'all';

        const defaultOptions = {
            onEnter: [],
            onLeave: [],
            onResize: [],
            onFirstRun: [],
        };

        // Merge options with defaults to make the state
        this.options = Object.assign({}, defaultOptions, options);

        // Migrate methods into an array, this is to enable future functionality of adding extra methods to an existing state
        if (typeof this.options.onEnter === 'function') {
            this.options.onEnter = [this.options.onEnter];
        }

        if (typeof this.options.onLeave === 'function') {
            this.options.onLeave = [this.options.onLeave];
        }

        if (typeof this.options.onResize === 'function') {
            this.options.onResize = [this.options.onResize];
        }

        if (typeof this.options.onFirstRun === 'function') {
            this.options.onFirstRun = [this.options.onFirstRun];
        }

        // Test the one time tests first, if the test is invalid we wont create the config option
        if (this.testConfigOptions('once') === false) {
            this.valid = false;
            return false;
        }

        this.valid = true;
        this.active = false;
        this.init();
    }

    init() {
        this.test = window.matchMedia(this.query);

        if (this.test.matches && this.testConfigOptions('match')) {
            this.enterState();
        }

        this.listener = (test) => {
            let changed = false;

            if (test.matches) {
                if (this.testConfigOptions('match')) {
                    this.enterState();
                    changed = true;
                }
            } else {
                this.leaveState();
                changed = true;
            }

            if (changed) {
                stateChangeMethod();
            }
        };

        this.test.addListener(this.listener);
    }

    // Handle entering a state
    enterState() {
        fireAllMethodsInArray(this.options.onFirstRun);
        fireAllMethodsInArray(this.options.onEnter);
        this.options.onFirstRun = [];
        this.active = true;
    }

    // Handle leaving a state
    leaveState() {
        fireAllMethodsInArray(this.options.onLeave);
        this.active = false;
    }

    // Handle the user resizing the browser
    resizeState() {
        if (this.testConfigOptions('resize')) {
            fireAllMethodsInArray(this.options.onResize);
        }
    }

    // When the StateManager removes a state we want to remove the event listener
    destroy() {
        this.test.removeListener(this.listener);
    }

    attachCallback(type, callback, runIfActive) {
        switch (type) {
        case 'enter':
            this.options.onEnter.push(callback);
            break;
        case 'leave':
            this.options.onLeave.push(callback);
            break;
        case 'resize':
            this.options.onResize.push(callback);
            break;
        default:
            break;
        }

        if (type === 'enter' && runIfActive && this.active) {
            callback();
        }
    }

    testConfigOptions(when) {
        let test = true;

        configOptions.forEach((configOption) => {
            if (typeof this.options[configOption.name] !== 'undefined') {
                if (configOption.when === when && configOption.test.bind(this)() === false) {
                    test = false;
                }
            }
        });

        return test;
    }

    static addConfigOption(configOption) {
        configOptions.push(configOption);
    }

    static getConfigOptions() {
        return configOptions;
    }

    static removeConfigOption(name) {
        configOptions.forEach((item, index) => {
            if (item.name === name) {
                configOptions.splice(index, 1);
            }
        });
    }

    static setStateChangeMethod(func) {
        if (typeof func === 'function') {
            stateChangeMethod = func;
        } else {
            throw new Error('Not a function');
        }
    }
}
