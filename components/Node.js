import NodeRelationList from './NodeRelationList';
import AuthorName from './AuthorName';
import Link from 'next/link';
import { annuitCœptis } from '../classes/AnnuitCœptis.class';
import NodeSelector from './NodeSelector';
import { useRouter } from 'next/router';

const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_TRAVELER = 2
;

export default function Node({ node, context, nodeId }) {
	const nodeParent = node.getParents ? node.getParents()[0] : undefined;
	const nodeAuthor = node.getAuthors ? node.getAuthors()[0] : undefined;

	return (
		<>
			{ nodeParent !== undefined &&
				<Node
					node={ nodeParent }
					context="parent"
				/>
			}
			<li className={ `node type_Comment` }>
				{ nodeAuthor && <AuthorName user={ nodeAuthor } /> }
				<Link href={ `/node/${ node.id.toString() }` }>
					<a>
						<span className="text">{ node.text }</span>
					</a>
				</Link>

				{ context !== 'parent' && <>
					<NodeSelector
						nodeOptions={ node.getChildren() }
						selectOnCreate
						onSelect={ chosenNode => annuitCœptis.navigate(node, chosenNode) }
						createNode={
							(text) => annuitCœptis.createData({
								text,
								rel: {
									[ RT_AUTHOR_OF ]: [ annuitCœptis.getAvatar() ],
									[ RT_CHILD_OF ]: [ node ]
								}
							})
						}
					/>
					<NodeRelationList
						rootNode={ node }
						blacklist={
							annuitCœptis.getRelationshipTypeById(1).titles[1]
						}
					/>
				</> }
			</li>
		</>
	);
};
