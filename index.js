
var persist = require('hyperapp-persist')

module.exports = function hmr (app) {
  return {
    mixins: [
      persist({ storage: 'hyperapp-hmr-state' })
    ],
    actions: {
      _restoreAllPreviousState: function (state) {
        return state.previous
      }
    },
    events: {
      loaded: function (state, actions) {
        if (state.previous) {
          actions._restoreAllPreviousState() 
        }
      },
      // TODO: Experiment with recording and rolling back actions
      // actions: function () {},
    }
  }
}
