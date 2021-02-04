const nodeType = 'default';
const Default = {
	nodeType: nodeType,
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			getNodeTypes() {
				return [ ...super.getNodeTypes(), nodeType];
			}
		};
		return AnnuitCœptisII;
	}
};

export default Default;
