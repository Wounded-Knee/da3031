const React = require('react');
const { addMixin } = require('../../util/mixin');

const Gif = {
	name: 'GIF Displayer',

	uuid: 'cf262d12-13ab-4711-8f07-6837fc3a8d33',

	d3: {
		getRendererByNode: function({ _super, getConfigFromNode }, node) {
			const { gif: render } = getConfigFromNode(node);
			return render
				? ({ node }) => React.createElement(
				  "img",
				  {
				  	src: node.text,
				  	width: 500,
				  }
				) : _super(node);
		},

		createNode: function({ _super, addConfigToNode }, data) {
			const gif = (
				data.text.substr(-4,4).toLowerCase() === '.gif' &&
				data.text.substr(0,4).toLowerCase() === 'http'
			);
			
			return _super(
				gif
					? addConfigToNode(data, { gif })
					: data
			);
		},
	},
};

module.exports = addMixin(Gif);
