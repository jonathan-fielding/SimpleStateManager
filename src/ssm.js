import State from './state';
import {
    debounce,
    filterStates,
} from './utils';

// State Manager Constructor
class StateManager {
    constructor() {
        this.states = [];
        this.resizeTimer = null;
        this.configOptions = [];

        window.addEventListener('resize', debounce(this.resizeBrowser.bind(this), 25), true);
    }

    addState(options) {
        const newState = new State(options);

        if (newState.valid) {
            this.states.push(newState);
        }

        return newState;
    }

    addStates(statesArray) {
        statesArray.forEach(state => this.addState(state));
    }

    getState(id) {
        const selectedState = this.states.filter(state => state.id === id);

        return selectedState[0] || false;
    }

    isActive(id) {
        const selectedState = this.getState(id) || {};

        return selectedState.active || false;
    }

    getStates(idArr) {
        if (typeof (idArr) === 'undefined') {
            return this.states;
        }

        return idArr.map(id => this.getState(id));
    }

    removeState(id) {
        this.states.forEach((state, index) => {
            if (state.id === id) {
                state.destroy();
                this.states.splice(index, 1);
            }
        });
    }

    removeStates(idArray) {
        idArray.forEach(id => this.removeState(id));
    }

    removeAllStates() {
        this.states.forEach(state => state.destroy());
        this.states = [];
    }

    addConfigOption({
        name = '', // name, this is used to apply to a state
        test = null, // function which will perform the test
        when = 'resize', // resize or match (match will mean that resize will never fire either), or once (which will test once, then delete state if test doesnt pass)
    }) {
        if (name !== '' && test !== null) {
            State.addConfigOption({
                name,
                test,
                when,
            });
        }
    }

    removeConfigOption(name) {
        State.removeConfigOption(name);
    }

    getConfigOptions(name) {
        const configOptions = State.getConfigOptions();

        if (typeof name === 'string') {
            return configOptions.filter(configOption => configOption.name === name);
        }

        return configOptions;
    }

    resizeBrowser() {
        const activeStates = filterStates(this.states, 'active', true);

        activeStates.forEach((state) => {
            state.resizeState();
        });
    }

    stateChange(func) {
        State.setStateChangeMethod(func);
    }
}

export default new StateManager();
