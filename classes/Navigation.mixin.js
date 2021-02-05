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
				this.status = {
					...this.status,
					navByNodeCB: false
				};
				this.navigationByNodeCallback = () => { console.error('You need to override navigationByNodeCallback()!'); };
				this.navCurrentPath = undefined;
				return rv;
			}

			isInitialized() {
				return super.isInitialized() && this.status.navByNodeCB;
			}

			setNavigationByNodeCallback(cb) {
				this.navigationByNodeCallback = cb;
				this.status.navByNodeCB = true;
			}

			navigate(origin, destination) {
				console.log('Navigating from ', origin, ' to ', destination);
				if (!origin && this.getAvatar()) {
					this.createData({
						text: `${this.getAvatar().text}'s Untitled Path`,
						rel: {
							[ RT_AUTHOR_OF ]: [ this.getAvatar() ],
							[ RT_TRAVELER ]: [ this.getAvatar() ]
						}
					}).then( (response) => {
						this.navCurrentPath = response;
						return this.link(
							this.getRelationshipTypeById(RT_PATH_STEP),
							[
								this.navCurrentPath,
								destination
							]
						);
					}).then( (input) => {
						this.navigationByNodeCallback(destination);
						return input;
					}).catch( (err) => {
						console.error(err);
					});
				} else {
					this.navigationByNodeCallback(destination);
				}
			}
		};
		return AnnuitCœptisII;
	}
};

export default Navigation;
