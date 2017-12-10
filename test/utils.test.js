import test from 'tape';
import tapSpec from 'tap-spec';
import {
    fireAllMethodsInArray,
    makeID,
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
