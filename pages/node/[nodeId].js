import config from '../../d3.config';
import Link from 'next/link'
import Layout from '../../components/Layout';
import Node from '../../components/Node';
import NodeSelector from '../../components/NodeSelector';

const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_TRAVELER = 2
;

export default function NodeView({ d3 }) {
	const nodeId = d3.getQuery().nodeId;
	const node = d3.getDataById(nodeId);
	console.log(nodeId, node);

	return (
		<Layout title="Node View">
			{
				!d3.isInitialized()
					? <div className="loading">Loading...</div>
					: <>
						<ol className="nodes">
							{ node
								? <Node node={ node } />
								: <p>{ `Node #${nodeId} not found.` }</p>
							}
						</ol>

						{ node
							? <NodeSelector
								nodeOptions={ node.getChildren() }
								selectOnCreate
								onSelect={ chosenNode => d3.navigate(node, chosenNode) }
								createNode={
									(text) => d3.createData({
										text,
										rel: {
											[ RT_CHILD_OF ]: [ node ]
										}
									})
								}
							/> : null }
					</>
			}
		</Layout>
	);
};
