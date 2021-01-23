const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_PATH_STEP = 2,
	RT_TRAVELER = 3
;

// Requires: Relationship, Avatar
const Navigation = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.navigationByNodeCallback = () => {};
				this.navCurrentPath = undefined;
				this.navRtPath = this.createData({
					text: 'Path',
				});
				this.navRtPathStep = this.createData({
					text: 'Path Step',
				});
				return rv;
			}

			setNavigationByNodeCallback(cb) {
				this.navigationByNodeCallback = cb;
			}

			navigate(origin, destination) {
				if (!origin) {
					this.createData({
						text: `${this.getAvatar().text}'s Untitled Path`,
						rel: {
							[ RT_AUTHOR_OF ]: [ this.getAvatar() ],
							[ RT_TRAVELER ]: [ this.getAvatar() ]
						}
					}).then( (response) => {
						this.navCurrentPath = response;
						this.link(
							this.getRelationshipTypeById(RT_PATH_STEP),
							[
								this.navCurrentPath,
								destination
							]
						);
						this.navigationByNodeCallback(destination);
					}).catch( (err) => {
						console.error(err);
					});
				}
			}
		};
		return AnnuitCœptisII;
	}
};

export default Navigation;
