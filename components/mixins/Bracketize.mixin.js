const { addMixin } = require('../../util/mixin');

const Bracketize = {
	name: 'Bracketize',

	uuid: '32f655ac-34f9-47dc-b75c-29af6a05f5d6',

	d3: {
		hydrateData: function({ _super }, ...options) {
			const data = _super(...options);
			const { bracketize } = data[Bracketize.uuid] || {};
			return {
				...data,
				text: bracketize ? `[${data.text}]` : data.text,
			};
		},
	
		createNode: function({ _super }, data) {
			const bracketize = data.text.substring(0,1) === '-';
			return _super(bracketize ? {
				...data,
				[Bracketize.uuid]: {
					bracketize: true
				},
			} : data);
		},
	},
};

module.exports = addMixin(Bracketize);
