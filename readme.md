
# hyperapp-hmr

> Persist the app state while the code reloads

A [HyperApp](https://github.com/hyperapp/hyperapp) mixin that lets you perform [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) without needing any ties into your build mechanism.

```js
var { h, app } = require('hyperapp')
var hmr = require('hyperapp-hmr')

app({
  // Simply load HMR as a mixin, defaults to using localStorage
  mixins: [ hmr() ],
  
  // The rest of your application stays unchanged, e.g. state:
  state: { count: 0 },

  // Try changing action's functionality as the app is running with HMR
  // Then when you reload, the state is persisted and the functions are updated
  actions: {
    add: (state) => ({ count: state.count + 1 })
  },

  // Also change the view freely with the HMR
  view: (state, actions) =>
    <div class='app'>
      <button onclick={actions.add}>Add one</button>
      <span>Current value: {state.count}</span>
    </div>
})
```

> Example Webpack HMR configuration can be found at [andyrj/hyperapp-starter](https://github.com/andyrj/hyperapp-starter), further details can also be found on the (webpack documentation website)[https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr]

```js
var { h, app } = require('hyperapp')
var hmr = require('hyperapp-hmr')

app({
  // global option allows storing state to a global instead so that refesh acts as a reset
	// and webpack hmr can be setup as done normally, if noLS is not specified state will be saved in
	// both localStorage and window[global.name]
  mixins: [ hmr({ global:{ name: 'state', noLS: true }}) ],
  
  // The rest of your application stays unchanged, e.g. state:
  state: { count: 0 },

  // Try changing action's functionality as the app is running with HMR
  // Then when you reload, the state is persisted and the functions are updated
  actions: {
    add: (state) => ({ count: state.count + 1 })
  },

  // Also change the view freely with the HMR
  view: (state, actions) =>
    <div class='app'>
      <button onclick={actions.add}>Add one</button>
      <span>Current value: {state.count}</span>
    </div>
})
```

TODO: Replace this example with a screen capture of the test

See [Usage](#usage) for more details, and [Testing](#testing) for seeing an example

## Install

```
npm i hyperapp-hmr
```

## Usage

The module exports an `hmr` mixin, which will persist all of the app's state between reloads, so the actions and views can change seamlessly underneath.

Take an example: You go to a route on your page, open up a sidebar, click a button that opens a prompt, type in the prompt...  These are a lot of steps you have to repeat over and over without the state being persisted.  HMR solves this.

### `hmr`

The mixin that you load into your app:

```js
var hmr = require('hyperapp-hmr')

app({
  mixin: [ hmr ]
})
```

### What about live-reloading?

Live-reloading is not provided out of the box in `hyperapp-hmr` because:

 - There are standalone auto-reload servers you can opt-in to using with this package with no problems. For example, see [`budo`](https://npmjs.com/budo) for a prototyping tool that lets you live-reload _super easy_.
 - There may be people who are uninterested in what it takes to setup auto-reloading, and don't mind just hitting F5 with the same HMR benefits.
 - It would significantly increase the complexity of the package, as there would need to be a server-side so we could detect file changes, and communicate that to client-side for reloading, etc. which makes it less appealing to some.

### Integration with Webpack?

I personally main [Browserify](https://github.com/substack/node-browser), which is why there nothing made using [`module.hot`](https://webpack.github.io/docs/hot-module-replacement.html#api).

That being said, happy to accept PRs that can integrate those features with the same usage shown here.

## Testing

To run the tests, clone the repository and run:

```sh
npm i
npm run test:browser
```

This will create temporary server that hosts and live-reloads `test/index.js`.

Go into `test/index.js` and make edits to the view and actions see if the HMR is working.

(Note: it is intentionally not `npm test` so release tools don't think they're unit tests)

