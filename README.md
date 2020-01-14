# Interval Promise

[![NPM Version](https://img.shields.io/npm/v/interval-promise.svg)](https://npmjs.org/package/interval-promise)
[![Build Status](https://travis-ci.org/andyfleming/interval-promise.svg?branch=master)](https://travis-ci.org/andyfleming/interval-promise)
[![Coverage Status](https://coveralls.io/repos/github/andyfleming/interval-promise/badge.svg?branch=master)](https://coveralls.io/github/andyfleming/interval-promise?branch=master)

## Overview

This library provides a simple mechanism for running a promise with a given amount of time between executions.

#### Standard Javascript » setInterval()

![traditional interval](https://user-images.githubusercontent.com/721038/33246371-9d0a6e56-d2c8-11e7-9787-cd67354c9f38.png)

#### interval-promise » interval()

![interval promise](https://user-images.githubusercontent.com/721038/33246370-9cf05a20-d2c8-11e7-816c-744ee6b5a094.png)


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
}, 1000, {iterations: 10})
```

## API

```javascript
interval(func, intervalLength, options = {}) // returns Promise<undefined>
```

### Arguments

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
            <td><code><b>func</b></code></td>
            <td><i>function</i></td>
            <td><b>Required</b><br>Function to execute for each interval. <i>MUST</i> return a promise.<br><br>Two arguments are passed to this function.
                <ul>
                    <li><code>iterationNumber</code> <i>number</i> — The iteration number (starting at 1)</li>
                    <li><code>stop</code> <i>function</i> — used to "stop" (skipping all remaining iterations)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code><b>intervalLength</b></code></td>
            <td><i>number | function</i></td>
            <td><b>Required</b><br>Length in ms to wait between iterations. Should be (or return) a non-negative integer.<br><br>If a function is used, one parameter <code>iterationNumber</code> (starting at 1) is passed.</td>
        </tr>
        <tr>
            <td><code><b>options</b></code></td>
            <td><i>object</i></td>
            <td>Optional settings (detailed below).
        <tr>
            <td><code>options.<b>iterations</b></code></td>
            <td><i>number</i></td>
            <td><b>Default: </b><code>Infinity</code><br>The number of times to execute the function. Must be Infinity or an integer greater than 0.</td>
        </tr>
        <tr>
            <td><code>options.<b>stopOnError</b></code></td>
            <td><i>boolean</i></td>
            <td><b>Default: </b><code>true</code><br>If true, no subsequent calls will be made. The promise returned by interval() will be rejected and pass through the error thrown.</td> 
        </tr>
    </tbody>
</table>

## Project Values

* **Approachability** — Basic usage should be concise and readable.
* **Debuggability** — Error feedback should be helpful and error handling options should be flexible.
* **Stability** — Functionality should be well-tested and reliable.

## Acknowledgements

This library was inspired by [reissue](https://github.com/DonutEspresso/reissue).

## FAQ

### How can I stop the interval from _outside_ the interval function?

There isn't currently direct feature to stop the iterations externally. You can, however, achieve this by checking a variable in the parent scope (of where the function is defined). Check out the code below.

```js
const interval = require('interval-promise')

let stoppedExternally = false
const stopExternally = () => { stoppedExternally = true }

interval(async (iteration, stop) => {

    if (stoppedExternally) {
        stop()
    }
    
    // ... normal functionality ...
    
}, 1000)

// Some other work...
someOtherWork().then(() => {

    // Now that our "other work" is done, we can stop our interval above with:
    stopExternally()

})
```
