import React from 'react';
import '../styles/globals.css'
import { withRouter } from 'next/router';
import { annuitCœptis } from '../classes/AnnuitCœptis.class';

class D3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			renderCount: 0,
		};

		annuitCœptis.setNavigationByNodeCallback( this.navigateToNode.bind(this) );
		annuitCœptis.setReRenderCallback( this.reRender.bind(this) );
	}

	navigateToNode(node) {
		const { router } = this.props;
		router.push(`/node/${node.id}`);
	}

	reRender() {
		this.setState({
			renderCount: this.state.renderCount+1
		});
	}

	render() {
		const { router, Component, pageProps } = this.props;
		const providerData = {
			annuitCœptis: annuitCœptis,
			rc: this.state.renderCount,
			router: router
		};

		return (
			<Component {...providerData} {...pageProps} />
		);
	}
};

export default withRouter(D3);
