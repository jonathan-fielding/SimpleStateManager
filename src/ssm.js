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
            return idArr.map((id) => {
                return this.getState(id)
            });
        }
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
        idArray.forEach((id) => this.removeState(id));
    }

    removeAllStates() {
        this.states.forEach(state => state.destroy());
        this.states = [];
    }

    addConfigOption(options) {
        const defaultOptions = {
            name: '', // name, this is used to apply to a state
            test: null, //function which will perform the test
            when: 'resize' // resize or match (match will mean that resize will never fire either), or once (which will test once, then delete state if test doesnt pass)
        };

        //Merge options with defaults
        options = Object.assign({}, defaultOptions, options);

        if (options.name !== '' && options.test !== null) {
            State.addConfigOption(options);
        }
    }

    removeConfigOption(name) {
        State.removeConfigOption(name);
    }

    getConfigOptions(name) {
        var configOptions = State.getConfigOptions();

        if(typeof name === "string"){
            return configOptions.filter(configOption =>  configOption.name === name);
        }
        else{
            return configOptions;
        }
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
};

export default new StateManager();
