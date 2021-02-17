import mixin from '../../util/mixin';
const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_PATH_STEP = 2,
	RT_TRAVELER = 3
;

const Navigation = (d3) => mixin(d3, {
	'navigate': function(_super, origin, destination) {
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
				this.navigateToNode(destination);
				return input;
			}).catch( (err) => {
				console.error(err);
			});
		} else {
			this.navigateToNode(destination);
		}
	},
});

export default Navigation
