const avatars = [];

const Avatar = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.avatarCurrent = undefined;
				return rv;
			}

			createAvatar(data) {
				const newAvatar = this.createData(data);
				avatars.push(
					newAvatar
				);
				return newAvatar;
			}

			getAvatars() {
				return avatars;
			}

			setAvatar(avatar) {
				this.avatarCurrent = avatar;
				const { reRenderCallback = () => {} } = this;
				reRenderCallback();
			}

			getAvatar() {
				return this.avatarCurrent;
			}
		};
		return AnnuitCœptisII;
	}
};

export default Avatar;
