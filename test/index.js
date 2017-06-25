var { h, app, Router } = require('hyperapp')
var hmr = require('../')

app({
  mixins: [ Router, hmr ],
  state: {
    count: 0,
    input: '',
  },
  actions: {
    add: state => ({ count: state.count + 1 }),
    sub: state => ({ count: state.count - 1 }),
    input: (state, _a, e) => ({ input: e.target.value }),
    inputReverse: (state, _a, e) => ({
      input: e.target.value.split('').reverse().join('')
    }),
  },
  view: [
    ['/', home],
    ['/test', test],
    ['*', () => <div>404</div>]
  ]
})

// Change the view's actions while the test is running and open in the browser
// Without needing to reload, these changes should apply immediately in the same state.
function home (state, actions) {
  return <div class='home'>
    <button onclick={actions.add}>Add one</button>
    <input oninput={actions.input} />
    <br />
    <span>{state.count} {state.input}s</span>
    <div>Go to <a href='/test'>/test</a></div>
  </div>
}

// Also try changing stuff while on a different page, and HMR should preserve it too.
function test (state, actions) {
  return <div class='test'>
    Hello I am the test page.  Here is the state:
    <code><pre>{ JSON.stringify(state, null, 2) }</pre></code>
  </div>
}

