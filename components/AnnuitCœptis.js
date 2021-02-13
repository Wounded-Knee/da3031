import React from 'react';
import { withRouter } from 'next/router';
import { annuitCœptis, Component } from '../classes/AnnuitCœptis.class';
import { Provider, Consumer } from '../classes/Provider';
import Window from './Window';

class AnnuitCœptis extends React.Component {
	constructor() {
		super();
		this.state = {
			renderCount: 0
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
		const { router, children } = this.props;
		const providerData = {
			annuitCœptis: annuitCœptis,
			rc: this.state.renderCount,
			router: router
		};

		return (
			<Provider value={ providerData }>
				<Window />
				{ children }
			</Provider>
		);
	}
};

export default withRouter(AnnuitCœptis);
