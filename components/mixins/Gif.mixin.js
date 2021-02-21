const React = require('react');
const { addMixin } = require('../../util/mixin');

const useRenderer = (node) => node[Gif.uuid] && node[Gif.uuid].gif;
const Gif = {
	name: 'GIF Displayer',

	uuid: 'cf262d12-13ab-4711-8f07-6837fc3a8d33',

	d3: {
		getRendererByNode: function({ _super }, node) {
			return useRenderer(node)
				? ({ node }) => React.createElement(
				  "img",
				  {
				  	src: node.text,
				  	height: 200,
				  	width: 200,
				  }
				) : _super(node);
		},

		createNode: function({ _super }, data) {
			const gif = data.text.substr(-3,3).toLowerCase() === 'gif';
			return _super(gif ? {
				...data,
				[Gif.uuid]: {
					gif: true
				},
			} : data);
		},
	},
};

module.exports = addMixin(Gif);
