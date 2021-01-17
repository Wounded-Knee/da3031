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
				this.navCurrentPath = undefined;
				this.navRtPath = this.createData({
					text: 'Path',
				});
				this.navRtPathStep = this.createData({
					text: 'Path Step',
				});
				return rv;
			}

			navigate(origin, destination) {
				if (!origin) {
					this.navCurrentPath = this.createData({
						text: `${this.getAvatar().text}'s Untitled Path`,
						rel: {
							[ RT_AUTHOR_OF ]: [ this.getAvatar() ],
							[ RT_TRAVELER ]: [ this.getAvatar() ]
						}
					});
				}
				this.link(this.navCurrentPath, destination, this.getRelationshipTypeById(RT_PATH_STEP))
			}
		};
		return AnnuitCœptisII;
	}
};

export default Navigation;
