import Link from 'next/link';

export default function Node(props) {
	const config = {
		nodeType: "default",
		node: undefined,
		parentRecursionLimit: Infinity,
		recursionCount: 0,
		RenderNode: ({ node }) => <span className="text">{ node.text }</span>,
		...props,
	};
	const {
		node,
		nodeType,
		recursionCount,
		parentRecursionLimit,
		RenderNode,
	} = config;
	const nodeParent = node.getParents ? node.getParents()[0] : undefined;

	return (
		<>
			{ nodeParent !== undefined && recursionCount < parentRecursionLimit &&
				<Node
					{...props}
					node={ nodeParent }
					recursionCount={ recursionCount+1 }
				/>
			}
			<li className={ `node type_${nodeType} recursion_${recursionCount}` }>
				<Link href={ `/node/${ node.id.toString() }` }>
					<a>
						<RenderNode {...props} />
					</a>
				</Link>
			</li>
		</>
	);
};
