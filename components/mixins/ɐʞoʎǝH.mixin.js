const { addMixin } = require('../../util/mixin');
const upsideDown = require('@szum.szym/upside-down');

const ɐʞoʎǝH = {
	name: 'ɐʞoʎǝH',

	uuid: '8eadde2d-71fe-4d1c-a31e-362c8dc4a31b',

	d3: {
		getData: function({ _super }, ...options) {
			return _super(...options);
		},

		hydrateData: function({ _super }, ...options) {
			const data = _super(...options);
			return {
				...data,
				text: `[${data.text}]`,
			};
		},
	
		createNode: function({ _super }, ...options) {
			return _super(...options);
		},
	},
};

module.exports = addMixin(ɐʞoʎǝH);
