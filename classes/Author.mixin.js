const Author = {
	extend: (AnnuitCœptis) => {		
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.systemUser = this.createData({
					text: 'SYSTEM'
				});
				console.log('System user ', this.systemUser);
				return rv;
			}

			conceiveData(data) {
				const newData = super.conceiveData(data);
				const authorId = newData.author_id !== undefined ? newData.author_id : this.systemUser ? this.systemUser.id : undefined;
				return {
					...newData,
					author_id: authorId
				};
			}

			hydrateData(data) {
				const superData = super.hydrateData(data); if (superData === undefined) return superData;
				const {
					author_id,
					...newData
				} = superData;

				const author = author_id !== undefined && author_id !== newData.id ? this.getDataById(author_id) : { id: author_id };
				console.log(`${superData.text} was authored by #${author_id} (${author.text})`);
				const rv = author ? { ...newData, author } : newData;
				return rv;
			}
		};
		return AnnuitCœptisII;
	}
};

export default Author;
