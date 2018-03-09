import test from 'tape';
import tapSpec from 'tap-spec';
import {
    fireAllMethodsInArray,
    makeID,
    funcToArray,
} from '../src/utils';

test.createStream().pipe(tapSpec()).pipe(process.stdout);

test('fireAllMethodsInArray', (t) => {
    t.plan(2);

    const methods = [() => {
        t.pass('First method executed');
    }, () => {
        t.pass('Second method executed');
    }];

    fireAllMethodsInArray(methods);
});

test('makeID', (t) => {
    const ids = [
        makeID(),
        makeID(),
        makeID(),
        makeID(),
        makeID(),
    ];

    t.plan(ids.length);
    ids.map(id => t.equal(id.length, 9));
});

test('funcToArray', (t) => {
    const func = () => {};
    const funcArray = funcToArray(func);

    t.plan(2);

    if (funcArray.length === 1) {
        t.pass('The array returned has a length of 1');
    }

    if (funcArray[0] === func) {
        t.pass('The item of the array is the original function');
    }
});
