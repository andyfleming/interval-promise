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
