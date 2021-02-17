const mixin = (d3, methods) => {
	Object.keys(methods).forEach((method) => {
		const _super = d3[method] ? d3[method].bind(d3): () => {};
		d3[method] = methods[method].bind(d3, _super);
	});
	return d3;
};

const getNodes = (id) => {
	console.log('xxx', this);
	return this.state.nodes.filter((node) => node.mixin_id === id);
};

module.exports = {
	mixin,
	getNodes,
};
