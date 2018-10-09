const test = require('ava')
const interval = require('../src/index')

test.cb('User function should be called', t => {
    t.plan(1)
    
    const userFunc = () => {
        t.pass()
        t.end()
        return Promise.resolve()
    }

    interval(userFunc, 10)
})

test.cb('User function should be called exactly the desired number of iterations', t => {
    t.plan(3)
    
    const userFunc = i => {
        
        // If the function was called for a 4th time, throw an error
        if (i > 3) {
            throw new Error('User func was called more than 3 times')
        }

        // Otherwise mark the pass
        t.pass()
        
        return Promise.resolve()
    }

    interval(userFunc, 10, {iterations: 3}).then(() => {
        t.end()
    })
})
