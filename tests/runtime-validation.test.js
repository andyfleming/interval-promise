const test = require('ava')
const interval = require('../src/index')

test.cb('The user "func" must return a Promise', t => {
    t.plan(1)

    interval(() => {}, 1, {iterations: 1}).catch((err) => {
        t.is(err.message, 'Return value of "func" must be a Promise.')
        t.end()
    })
})

test.cb('If intervalLength is a function, it should return a non-negative integer and reject -1', t => {
    t.plan(1)

    interval(() => Promise.resolve(), () => -1, {iterations: 1}).catch((err) => {
        t.is(err.message, 'Function for "intervalLength" argument must return a non-negative integer.')
        t.end()
    })
})

test.cb('If intervalLength is a function, it should return a non-negative integer and reject 1.1', t => {
    t.plan(1)

    interval(() => Promise.resolve(), () => 1.1, {iterations: 1}).catch((err) => {
        t.is(err.message, 'Function for "intervalLength" argument must return a non-negative integer.')
        t.end()
    })
})
