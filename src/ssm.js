import State from './state';
import {
    debounce,
    funcToArray,
    fireAllMethodsInArray,
    makeID,
    filterStates,
} from './utils';

var resizeTimeout = 25;

function Error(message) {
    this.message = message;
    this.name = "Error";
}

//State Manager Constructor
class StateManager {

    constructor(options) {
        this.states = [];
        this.resizeTimer = null;
        this.configOptions = [];

        window.addEventListener("resize", debounce(this.resizeBrowser.bind(this), resizeTimeout), true);    
    }

    addState(options) {
        var newState = new State(options);
        
        if (newState.valid) {
            this.states.push(newState);
        }

        return newState;
    }

    addStates(statesArray) {
        for (var i = statesArray.length - 1; i >= 0; i--) {
            this.addState(statesArray[i]);
        }

        return this;
    }

    getState(id) {
        for (var i = this.states.length - 1; i >= 0; i--) {
            var state = this.states[i];

            if(state.id === id){
                return state;
            }
        }
    }

    isActive(id) {
        var selectedState = this.getState(id) || {};

        return selectedState.active || false;
    }

    getStates(idArr)  {
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
    }

    removeState(id) {
        for (var i = this.states.length - 1; i >= 0; i--) {
            var state = this.states[i];

            if (state.id === id) {
                state.destroy();
                this.states.splice(i, 1);
            }
        }

        return this;
    }

    removeStates(idArray) {
        for (var i = idArray.length - 1; i >= 0; i--) {
            this.removeState(idArray[i]);
        }

        return this;
    }

    removeAllStates() {
        for (var i = this.states.length - 1; i >= 0; i--) {
            var state = this.states[i];
            state.destroy();
        }

        this.states = [];
    }

    addConfigOption(options) {
        var defaultOptions = {
            name: '', // name, this is used to apply to a state
            test: null, //function which will perform the test
            when: 'resize' // resize or match (match will mean that resize will never fire either), or once (which will test once, then delete state if test doesnt pass)
        };

        //Merge options with defaults
        options = Object.assign({}, defaultOptions, options);

        if(options.name !== '' && options.test !== null){
            State.addConfigOption(options);
        }
    }

    removeConfigOption(name) {
        State.removeConfigOption(name);
    }

    getConfigOption(name) {
        var configOptions = State.getConfigOptions();

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
    }

    getConfigOptions() {
        return State.getConfigOptions();
    }

    resizeBrowser() {
        var activeStates = filterStates(this.states, 'active', true);
        var len = activeStates.length;

        for (var i = 0; i < len; i++) {
            activeStates[i].resizeState();
        }
    }

    stateChange(func) {
        State.setStateChangeMethod(func);
    }
};

export default new StateManager();
