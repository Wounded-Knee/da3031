import Relationship from './classes/Relationship.mixin';
import User from './classes/User.mixin';
import Avatar from './classes/Avatar.mixin';
import Navigation from './classes/Navigation.mixin';
import Default from './nodeTypes/default/AnnuitCœptis.class';

const d3config = {
	nodeTypes: [Default],
	mixins: [User, Avatar, Relationship, Navigation],
};

export default d3config;
