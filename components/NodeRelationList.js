import NodeList from './NodeList';
import Link from 'next/link'

const NodeDisplay = (node) => {
	return (
		<>
			<Link href={ `/node/${ node.id }` }>
				<a>{ node.text }</a>
			</Link>
		</>
	);
};

export default function NodeRelationList({ rootNode, annuitCœptis, excludedRelationTypes }) {
	if (annuitCœptis.getRelationshipTypes) {
		return annuitCœptis
			.getRelationshipTypes()
			.map(
				(nodeRelationType) => <>
					{ nodeRelationType.titles.map(
						title => rootNode[title.g] ? <NodeList
							key={ nodeRelationType.id + title.plural }
							heading={ title.p } 
							nodes={ rootNode[title.g]() }
							nodeDisplay={ NodeDisplay }
						/> : null
					) }
				</>
			);
	} else {
		console.log('getRelationshipTypes undefined @ ', annuitCœptis);
		return null;
	}
};
