import React from 'react';
import '../styles/globals.css'
import { withRouter } from 'next/router';
import { AnnuitCœptis } from '../classes/AnnuitCœptis.class';

class D3 extends React.Component {
	constructor(props) {
		super(props);
		const { router } = this.props;

		this.annuitCœptis = new AnnuitCœptis({
			setState: this.setState.bind(this),
			router,
		});

		this.state = {
			renderCount: 0,
		};
	}

	render() {
		const { router, Component, pageProps } = this.props;
		const providerData = {
			annuitCœptis: this.annuitCœptis,
			rc: this.state.renderCount,
			router: router
		};

		return (
			<Component {...providerData} {...pageProps} />
		);
	}
};

export default withRouter(D3);
