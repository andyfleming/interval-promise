const test = require('ava')
const interval = require('../src/index')

test.cb('if stop is called from the user function, the function should not be called again', t => {
    t.plan(1)
    
    const userFunc = (i, stop) => {
        if (i > 1) {
            t.fail('Execution should have stopped')
        }

        stop()
        
        return Promise.resolve()
    }

    interval(userFunc, 10, {iterations: 3}).then(() => {
        t.pass()
        t.end()
    })
})

test.cb('iteration number should have expected result', t => {

    t.plan(1)

    let iValues = []
    
    const userFunc = i => {

        iValues.push(i)
        
        return Promise.resolve()
    }

    interval(userFunc, 10, {iterations: 10}).then(() => {
        t.deepEqual(iValues, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        t.end()
    })
})
