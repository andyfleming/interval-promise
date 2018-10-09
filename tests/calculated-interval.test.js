const test = require('ava')
const interval = require('../src/index')

test.cb('a function should be accepted for interval length', t => {
    t.plan(1)
    
    const userFunc = () => Promise.resolve()
    const calculateInterval = i => i

    interval(userFunc, calculateInterval, {iterations: 3}).then(() => {
        t.pass()
        t.end()
    })
})

test.cb('a function should be called for interval length', t => {
    t.plan(3)

    const callValues = []

    const userFunc = () => Promise.resolve()
    const calculateInterval = (iterationNumber) => {
        callValues.push(iterationNumber)
        return 10
    }

    interval(userFunc, calculateInterval, {iterations: 3}).then(() => {
        t.is(callValues[0], 1)
        t.is(callValues[1], 2)
        t.is(callValues[2], 3)
        t.end()
    })
})

