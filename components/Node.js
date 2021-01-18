import NodeRelationList from './NodeRelationList';
import AuthorName from './AuthorName';
import Link from 'next/link'

export default function Node({ node, context, annuitCœptis }) {
	console.log(node);

	if (!node) {
		console.log('Bad node? ', node);
		return null;
	}

	node.nodeType = { id: 0 };
	const nodeParent = node.getParents ? node.getParents()[0] : undefined;
	const nodeAuthor = node.getAuthors ? node.getAuthors()[0] : undefined;

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
					{ nodeParent !== undefined && 
						<Node
							node={ nodeParent }
							context="parent"
						/>
					}
					<li className={ `node type_${node.nodeType.name}` }>
						{ nodeAuthor && <AuthorName user={ nodeAuthor } /> }
						<Link href={ `/node/${ node.id.toString() }` }>
							<a>
								<span className="text">{ node.text }</span>
							</a>
						</Link>
						{ context !== 'parent' &&
							<NodeRelationList
								annuitCœptis={ annuitCœptis }
								rootNode={ node }
								excludedRelationTypes={ ['authors', 'parents'] }
							/>
						}
					</li>
				</>
			);
		break;
	}
};
