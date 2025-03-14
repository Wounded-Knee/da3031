const addMixin = (mixin) => (d3) => {
	if (d3) {
		const { d3: methods } = mixin;
	
		Object.keys(methods).forEach((method) => {
			const _super = d3[method] ? d3[method].bind(d3): () => {};
			d3[method] = methods[method].bind(d3, {
				_super,

				getMixinNodes: (id) => d3.state.nodes.filter(
					(node) => node.mixin_id === mixin.uuid
				),

				getConfigFromNode: (node) => node[mixin.uuid] || {},
				
				addConfigToNode: (node, config) => ({
					...node,
					[mixin.uuid]: config,
				}),

				mixin,
			});
		});
	}

	return {
		name: 'Unknown',
		uuid: '<?>',
		nodes: [],
		...mixin,
		d3
	};
};

module.exports = {
	addMixin,
};
