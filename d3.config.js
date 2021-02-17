const baseConfig = require('./config');
import { Relation } from './components/mixins/Relation.mixin';
import Navigation from './components/mixins/Navigation.mixin';

const config = {
	...baseConfig,
	mixins: [Relation, Navigation],
};

export default config;
