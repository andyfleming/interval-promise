# Interval Promise

## Installation

```bash
npm install interval-promise
```

## Usage

**Simple example using async-await**

```javascript
const interval = require('interval-promise')

// Run a function 10 times with 1 second between each iteration
interval(async () => {
    await someOtherPromiseReturningFunction()
    await another()
}, 1000, 10)
```

**Example using options**

```javascript
const interval = require('interval-promise')

const myFunc = async (i, stop) => {
    return new Promise((resolve, reject) => {
        if (i > 3) {
            stop()
        }
        resolve()
    })
}

const options = {
    interval: i => 2^i * 100
    iterations: 10
}

interval(myFunc, options).then(() => {
    console.log('All iterations complete.')
})
```

## API

```javascript
interval(func, intervalLength, [iterations]) // returns Promise<undefined>
```

<table>
    <thead>
        <tr>
            <th>Argument</th>
            <th>Attritubes</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>func</code></td>
            <td><i>function</i></td>
            <td><b>Required.</b><br>Function to execute for each interval. <i>MUST</i> return a promise.<br><br>Two arguments are passed to this function.
                <ul>
                    <li><code>iterationNumber</code> <i>number</i> — The iteration number (starting at 1)</li>
                    <li><code>stop</code> <i>function</i> — used to "stop" (skipping all remaining iterations)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>intervalLength</code></td>
            <td><i>number | function</i></td>
            <td><b>Required.</b><br>Length in ms to wait between iterations. Should be (or return) a positive integer.<br><br>If a function is used, one parameter <code>iterationNumber</code> is passed.</td>
        </tr>
        <tr>
            <td><code>iterations</code></td>
            <td><i>number</i></td>
            <td><b>Default: </b><code>Infinity</code><br>The number of times to execute the function.</td>
        </tr>
    </tbody>
</table>

## API — with advanced options

```javascript
interval(func, options) // returns Promise<undefined>
```

<table>
    <thead>
        <tr>
            <th>Argument</th>
            <th>Attritubes</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>func</code></td>
            <td><i>function</i></td>
            <td><b>Required.</b><br>Function to execute for each interval. <i>MUST</i> return a promise.<br><br>Two arguments are passed to this function.
                <ul>
                    <li><code>iterationNumber</code> <i>number</i> — The iteration number (starting at 1)</li>
                    <li><code>stop</code> <i>function</i> — used to "stop" (skipping all remaining iterations)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>options.interval</code></td>
            <td><i>number | function</i></td>
            <td><b>Required.</b><br>Length in ms to wait between iterations. Should be (or return) a positive integer.<br><br>If a function is used, one parameter <code>iterationNumber</code> is passed.</td>
        </tr>
        <tr>
            <td><code>options.iterations</code></td>
            <td><i>number</i></td>
            <td><b>Default: </b><code>Infinity</code><br>The number of times to execute the function.</td>
        </tr>
    </tbody>
</table>


## Acknowledgements

This library is heavily inspired by [reissue](https://github.com/DonutEspresso/reissue).
