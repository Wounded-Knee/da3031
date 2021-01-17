import NodeRelationList from './NodeRelationList';
import AuthorName from './AuthorName';
import Link from 'next/link'

export default function Node({ node, context }) {
	const nodeRelations = node.getRelations();
	console.log(node);

	switch(node.nodeType.id) {
		case 2: // User
			return (
				<span className={ `node type_${node.nodeType.name}` }>
					<span className="text">{ node.emoji } { node.text }</span>
					<NodeRelationList rootNode={ node } />
				</span>
			);
		break;

		default:
			return (
				<>
					{ nodeRelations.parents.length > 0 && 
						<Node
							node={ nodeRelations.parents[0] }
							context="parent"
						/>
					}
					<span className={ `node type_${node.nodeType.name}` }>
						<AuthorName user={ nodeRelations.authors[0] } />
						<Link href={ `/node/${ node.id.toString() }` }>
							<a>
								<span className="text">{ node.text }</span>
							</a>
						</Link>
						{ context !== 'parent' &&
							<NodeRelationList rootNode={ node } excludedRelationTypes={ ['authors', 'parents'] } />
						}
					</span>
				</>
			);
		break;
	}
};
