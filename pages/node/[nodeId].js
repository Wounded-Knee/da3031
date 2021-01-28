import React from 'react';
import RestDB from '../../classes/restdb';
import { withRouter } from 'next/router';
import Node from '../../components/Node';
import NodeSelector from '../../components/NodeSelector';
import { annuitCœptis, Component } from '../../classes/AnnuitCœptis.class';
import { JsonView } from 'json-view-for-react';

class NodeView extends React.Component {
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
		const { nodeId } = this.props.router.query;
		const activeAvatar = annuitCœptis.getAvatar();
		const node = annuitCœptis.getDataById(nodeId);

		return (
			<>
				<RestDB />

				<header>
					<span onClick={ this.reRender.bind(this) }>R{ this.state.renderCount }</span>
					<span>N{ annuitCœptis.data.length }</span>

					{
						Object.keys(annuitCœptis.status).map(
							(statusAttr) => annuitCœptis.status[statusAttr] ? (
								<span
									key={ statusAttr }
									className={ annuitCœptis.status[statusAttr] ? 'true' : 'false' }
								>
									{ statusAttr }
								</span>
							) : null
						)
					}

					{ annuitCœptis.getAvatars().map(
						avatar => <span
							onClick={ annuitCœptis.setAvatar.bind(annuitCœptis, avatar) }
							className={ activeAvatar === avatar ? 'active' : '' }
						>{ avatar.text }</span>
					) }
				</header>

				{ annuitCœptis.isInitialized() ? (
					<NodeSelector createNode={ (txt) => annuitCœptis.createData({ text: txt }) } />
				) : null }

				{
					annuitCœptis.status.dataLoading
						? (
							"Loading..."
						) : (
							annuitCœptis.isInitialized()
								? (
									<ol className="nodes">
										{ node
											? <Node node={ node } />
											: <p>{ `Node #${nodeId} not found.` }</p>
										}
										{
											annuitCœptis.getOrphans().filter(
												(orphan) => orphan.id !== nodeId
											).map(
												(orphan) => <Node
													key={ orphan.id }
													node={ orphan }
												/>
											)
										}
									</ol>
								) : (
									"Loading error."
								)
						)
				}

	 			<JsonView obj={ annuitCœptis.getData() } showLineNumbers />
			</>
		);
	}
};

export default withRouter(NodeView);
