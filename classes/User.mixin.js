const users = [];

const User = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.userCurrent = undefined;
				return rv;
			}

			createUser(data) {
				const newUser = this.createData(data);
				users.push(
					newUser
				);
				return newUser;
			}

			setUser(user) {
				this.userCurrent = user;
			}

			getUser() {
				return this.userCurrent;
			}

			getUsers() {
				return users;
			}
		};
		return AnnuitCœptisII;
	}
};

export default User;
