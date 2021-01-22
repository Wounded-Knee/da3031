import React from 'react';
import { withRouter } from 'next/router';
import Node from '../../components/Node';
import { annuitCœptis, Component } from '../../classes/AnnuitCœptis.class';
import { JsonView } from 'json-view-for-react';

class NodeView extends React.Component {
	constructor() {
		super();
		annuitCœptis.setNavigationByNodeCallback( this.navigateToNode.bind(this) );
	}

	navigateToNode(node) {
		const { router } = this.props;
		router.push(`/node/${node.id}`);
	}

	render() {
		const { router } = this.props;
		const { nodeId } = router.query;

		console.log('Router ', router);
		return (
			<>
				<ol className="nodes">
					<Node node={ annuitCœptis.getDataById(nodeId) } />
				</ol>

	 			<JsonView obj={ annuitCœptis.getData() } showLineNumbers />
			</>
		);
	}
};

export default withRouter(NodeView);
