import NodeList from './NodeList';
import Link from 'next/link'

const NodeDisplay = (node) => {
	return (
		<>
			<span className="relationship">{ node.relationship.author.text }</span>
			<Link href={ `/node/${ node.id.toString() }` }>
				<a>{ node.text }</a>
			</Link>
		</>
	);
};

export default function NodeRelationList({ rootNode, excludedRelationTypes }) {
	const nodeRelations = rootNode.getRelations();
	return Object.keys(nodeRelations)
		.filter(
			(nodeRelationType) => (excludedRelationTypes || []).indexOf(nodeRelationType) === -1
		)
		.map(
			(nodeRelationType) => <NodeList
				key={ nodeRelationType }
				heading={ nodeRelationType } 
				nodes={ nodeRelations[nodeRelationType] }
				nodeDisplay={ NodeDisplay }
			/>
		);
};
