const { addMixin } = require('../../util/mixin');

const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_PATH_STEP = 2,
	RT_TRAVELER = 3
;

const Navigation = {
	name: 'Navigation',
	
	uuid: '1022c6db-3ab0-4e0c-8b3e-e108f692691c',
	
	d3: {
		navigate: function({ _super }, origin, destination) {
			console.log(`Navigation: ${origin ? origin.text : '*'} => ${destination.text}`);
			if (!origin) {
				this.createNode({
					text: `User's Untitled Path`,
					rel: {
						[ RT_AUTHOR_OF ]: [ 1 ],
						[ RT_TRAVELER ]: [ 1 ]
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
				}).catch( (err) => console.error );
			} else {
				this.navigateToNode(destination);
			}
		},
	}
}

module.exports = addMixin(Navigation);
