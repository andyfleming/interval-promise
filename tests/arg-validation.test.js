const test = require('ava')
const interval = require('../src/index')

test('An error should be thrown if something other than function is passed', t => {
    const error = t.throws(() => {
        interval(1, 2)
    }, TypeError)

    t.is(error.message, 'Argument 1, "func", must be a function.')
})

test('An error should be thrown if no arguments are passed', t => {
    const error = t.throws(() => {
        interval()
    }, TypeError)

    t.is(error.message, 'Argument 1, "func", must be a function.')
})

test('An error should be thrown if a negative number is passed as the interval', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), -1)
    }, TypeError)

    t.is(error.message, 'Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
})

test.cb('An error should NOT be thrown if zero is passed as the interval', t => {
    t.plan(1)

    interval(() => Promise.resolve(), 0, {iterations: 1}).then(() => {
        t.pass()
        t.end()
    })
})

test.cb('An error should NOT be thrown if 1 is passed as the interval', t => {
    t.plan(1)

    interval(() => Promise.resolve(), 1, {iterations: 1}).then(() => {
        t.pass()
        t.end()
    })
})

test('An error should be thrown if a float is passed as the interval', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1.1)
    }, TypeError)

    t.is(error.message, 'Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
})

test('An error should be thrown if neither a function nor number is passed for "intervalLength"', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), true)
    }, TypeError)

    t.is(error.message, 'Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
})

test('An error should be thrown if the options argument is not an object', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1000, true)
    }, TypeError)

    t.is(error.message, 'Argument 3, "options", must be an object.')
})

test('An error should be thrown if an invalid option is passed', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1000, {invalidKey: true})
    }, TypeError)

    t.is(error.message, 'Option "invalidKey" is not a valid option.')
})

test('An error should be thrown if iterations is a negative number', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1000, {iterations: -1})
    }, TypeError)

    t.is(error.message, 'Option "iterations" must be Infinity or an integer greater than 0.')
})

test('An error should be thrown if iterations is 0', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1000, {iterations: 0})
    }, TypeError)

    t.is(error.message, 'Option "iterations" must be Infinity or an integer greater than 0.')
})

test('An error should be thrown if iterations is a float', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1000, {iterations: 1.1})
    }, TypeError)

    t.is(error.message, 'Option "iterations" must be Infinity or an integer greater than 0.')
})

test('An error should be thrown if stopOnError is not a boolean', t => {
    const error = t.throws(() => {
        interval(() => Promise.resolve(), 1000, {stopOnError: 1})
    }, TypeError)

    t.is(error.message, 'Option "stopOnError" must be a boolean.')
})
