
var persist = require('hyperapp-persist')

module.exports = function hmr (options) {
	if (!options) options = {}

	var saveGlobal = options.global !== undefined;
	var globalName = options.global.name || 'state';
	var disableLS = options.global.noLS || false;

	return function (app) {
		return {
			mixins: disableLS ? [] : [
				persist({ storage: 'hyperapp-hmr-state' })
			],
			actions: disableLS ? {} : {
				_restoreAllPreviousState: function (state) {
					return state.previous
				}
			},
			events: disableLS ? {} : {
				loaded: function (state, actions) {
					if (state.previous) {
						actions._restoreAllPreviousState() 
					}
				},
				render: function (data) {
					if (saveGlobal) {
						window[globalName] = Object.assign({}, window[globalName], data)
					}
				}
				// TODO: Experiment with recording and rolling back actions
				// actions: function () {},
			}
		}
	}
}
