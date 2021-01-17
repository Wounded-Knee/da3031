const User = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.userCurrent = undefined;
				return rv;
			}

			setUser(user) {
				this.userCurrent = user;
			}

			getUser() {
				return this.userCurrent;
			}
		};
		return AnnuitCœptisII;
	}
};

export default User;
