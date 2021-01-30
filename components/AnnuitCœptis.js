import React from 'react';
import { withRouter } from 'next/router';
import { annuitCœptis, Component } from '../classes/AnnuitCœptis.class';
import RestDB from '../classes/restdb';
import { Provider, Consumer } from '../classes/Provider';

class AnnuitCœptis extends React.Component {
	constructor() {
		super();
		this.state = {
			renderCount: 0
		};
		//annuitCœptis.setNavigationByNodeCallback( this.navigateToNode.bind(this) );
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
		const { router, children } = this.props;
		const providerData = {
			annuitCœptis: annuitCœptis,
			rc: this.state.renderCount,
			router: router
		};
		console.log('Router ', router);
		return (
			<Provider value={ providerData }>
				<RestDB />

				{ children }
			</Provider>
		);
	}
};

export default withRouter(AnnuitCœptis);
