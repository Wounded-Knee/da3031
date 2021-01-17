const Avatar = {
	extend: (AnnuitCœptis) => {
		class AnnuitCœptisII extends AnnuitCœptis {
			constructor(mixins) {
				const rv = super(mixins);
				this.avatarCurrent = undefined;
				return rv;
			}

			setAvatar(avatar) {
				this.avatarCurrent = avatar;
			}

			getAvatar() {
				return this.avatarCurrent;
			}
		};
		return AnnuitCœptisII;
	}
};

export default Avatar;
