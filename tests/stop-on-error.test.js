const test = require('ava')
const interval = require('../src/index')

test.cb('if true, should prevent further execution', t => {
    t.plan(1)
    
    const userFunc = i => {
        if (i > 1) {
            t.fail('Execution should have stopped')
        }
        
        return Promise.reject()
    }

    interval(userFunc, 10, {iterations: 3}).then(() => {
        t.fail()
    }).catch(() => {
        t.pass()
        t.end()
    })
})

test.cb('if false, option should prevent interval from stopping', t => {
    t.plan(3)
    
    const userFunc = () => {
        t.pass()
        
        return Promise.reject()
    }

    interval(userFunc, 10, {iterations: 3, stopOnError: false}).then(() => {
        t.end()
    })
})
