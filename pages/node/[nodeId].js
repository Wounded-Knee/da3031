import React, { useEffect } from 'react';
import RestDB from '../../classes/restdb';
import { withRouter } from 'next/router';
import Node from '../../components/Node';
import { annuitCœptis, Component } from '../../classes/AnnuitCœptis.class';
import { JsonView } from 'json-view-for-react';

class NodeView extends React.Component {
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

	setUser(user) {
		annuitCœptis.setUser(user);
	}

	reRender() {
		this.setState({
			renderCount: this.state.renderCount+1
		});
	}

	render() {
		const { nodeId } = this.props.router.query;
		const activeAvatar = annuitCœptis.getAvatar();
		const setRestDB = annuitCœptis.setRestDB.bind(annuitCœptis);
		const node = annuitCœptis.getDataById(nodeId);

		return (
			<>
				<RestDB setRestDB={ setRestDB } />

				<header>
					{ annuitCœptis.getAvatars().map(
						avatar => <span
							onClick={ annuitCœptis.setAvatar.bind(annuitCœptis, avatar) }
							className={ activeAvatar === avatar ? 'active' : '' }
						>{ avatar.text }</span>
					) }

					<span onClick={ this.reRender.bind(this) }>R{ this.state.renderCount }</span>
					<span>N{ annuitCœptis.data.length }</span>
					<span onClick={ annuitCœptis.loadData.bind(annuitCœptis) } title="Load nodes from server">💥</span>

				</header>

				{ node ? (
					<ol className="nodes">
						<Node node={ node } />
					</ol>
				) : <p>{ `Node #${nodeId} not found.` }</p> }

	 			<JsonView obj={ annuitCœptis.getData() } showLineNumbers />
			</>
		);
	}
};

export default withRouter(NodeView);
