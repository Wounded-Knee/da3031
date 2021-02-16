const config = require('../../config');
import Link from 'next/link'
import Layout from '../../components/Layout';
import NodeSelector from '../../components/NodeSelector';

const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_TRAVELER = 2
;

export default function NodeView({ annuitCœptis, router, rc }) {
	const nodeId = router ? router.query.nodeId : '';
	const node = annuitCœptis.getDataById(nodeId);
	console.log(nodeId, node);

	return (
		<Layout title="Node View">
			{
				!annuitCœptis.isInitialized()
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
								onSelect={ chosenNode => annuitCœptis.navigate(node, chosenNode) }
								createNode={
									(text) => annuitCœptis.createData({
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
