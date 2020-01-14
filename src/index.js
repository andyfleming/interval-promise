/**
 * @param {*} val - value to check
 * 
 * @returns {boolean} true if the value is then-able
 */
function isPromise(val) {
    return val != null && typeof val.then === 'function'
}

/**
 * @param {function} func - function to execute
 * @param {number|function(number):number} intervalLength - length in ms to wait before executing again
 * @param {{iterations: Infinity|number, stopOnError: boolean}} [options]
 * 
 * @returns {Promise} Promise object with no result
 */
function interval(func, intervalLength, options = {}) {    

    validateArgs(func, intervalLength, options)

    const defaults = {
        iterations: Infinity,
        stopOnError: true
    }
    const settings = Object.assign(defaults, options)

    return new Promise((rootPromiseResolve, rootPromiseReject) => {

        const callFunction = currentIteration => {
            
            // Set up a way to track if a "stop" was requested by the user function
            let stopRequested = false
            const stop = () => {
                stopRequested = true
            }
        
            // Set up a function to call the next iteration. This is abstracted so it can be called by .then(), or in .catch(), if options allow.
            const callNext = () => {
                // If we've hit the desired number of iterations, or stop was called, resolve the root promise and return
                if (currentIteration === settings.iterations || stopRequested) {
                    rootPromiseResolve()
                    return
                }
        
                // Otherwise, call the next iteration
                callFunction(currentIteration + 1)
            }

            // Calculate our interval length
            const calculatedIntervalLength = (typeof intervalLength === 'function') ? intervalLength(currentIteration) : intervalLength
            
            // If the interval length was calculated, validate the result
            if (typeof intervalLength === 'function') {
                if (!Number.isInteger(calculatedIntervalLength) || calculatedIntervalLength < 0) {
                    rootPromiseReject(new Error('Function for "intervalLength" argument must return a non-negative integer.'))
                    return 
                }
            }
                
            // Call the user function after the desired interval length. After, call the next iteration (and/or handle error)
            setTimeout(() => {

                const returnVal = func(currentIteration, stop)
                
                // Ensure that the value returned is a promise
                if (!isPromise(returnVal)) {
                    rootPromiseReject(new Error('Return value of "func" must be a Promise.'))
                    return
                }

                returnVal.then(callNext).catch(err => {
                    if (!settings.stopOnError) {
                        callNext()
                        return
                    }
        
                    rootPromiseReject(err)
                })
            }, calculatedIntervalLength)
        }

        callFunction(1)        
    })
}

/**
 * A helper function to validate the arguments passed to interval(...)
 * 
 * @param {*} func 
 * @param {*} intervalLength 
 * @param {*} options
 */
function validateArgs(func, intervalLength, options) {

    // Validate "func"
    if (typeof func !== 'function') {
        throw new TypeError('Argument 1, "func", must be a function.')
    }

    // Validate "intervalLength"
    if (typeof intervalLength === 'number') {
        if (!Number.isInteger(intervalLength) || intervalLength < 0) {
            throw new TypeError('Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
        }
    } else if (typeof intervalLength !== 'function') {
        throw new TypeError('Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
    }

    // Validate options...
    if (typeof options !== 'object') {
        throw new TypeError('Argument 3, "options", must be an object.')
    }

    // Validate passed keys
    const allowedKeys = ['iterations', 'stopOnError']

    Object.keys(options).forEach(key => {
        if (!allowedKeys.includes(key)) {
            throw new TypeError('Option "' + key + '" is not a valid option.')
        }
    })
    
    // validate "iterations" option (if passed)
    if (typeof options.iterations !== 'undefined') {
        if (options.iterations !== Infinity && (!Number.isInteger(options.iterations) || options.iterations < 1)) {
            throw new TypeError('Option "iterations" must be Infinity or an integer greater than 0.')
        }
    }
    
    // validate "stopOnError" option (if passed)
    if (typeof options.stopOnError !== 'undefined') {
        if (typeof options.stopOnError !== 'boolean') {
            throw new TypeError('Option "stopOnError" must be a boolean.')
        }
    }
}

module.exports = interval
