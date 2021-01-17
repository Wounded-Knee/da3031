const test = {
	xextend: (AnnuitCœptis) => {
		Object.assign(AnnuitCœptis.prototype, test.AnnuitCœptis || {});
	},
	xinitialize: (annuitCœptis) => {
		annuitCœptis.createData({
			shenan: 'doa'
		});
	},
	AnnuitCœptis: {
		addGoodData: function() {
			this.createData({
				bob: 'Villa'
			});
		}
	}
};

export default test;
