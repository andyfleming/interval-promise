const test = require('ava')
const interval = require('../src/index')

test('An error should be thrown if something other than function is passed', t => {
    const error = t.throws(() => {
		interval(1, 2)
	}, TypeError)

	t.is(error.message, 'Argument func must be a function. interval(func, intervalLength, options)')
})

test('An error should be thrown if no arguments are passed', t => {
    const error = t.throws(() => {
		interval()
	}, TypeError)

	t.is(error.message, 'Argument func must be a function. interval(func, intervalLength, options)')
})
