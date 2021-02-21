import Link from 'next/link';

export default function Node(props) {
	const config = {
		nodeType: "default",
		node: undefined,
		parentRecursionLimit: Infinity,
		recursionCount: 0,
		...props,
	};
	const {
		d3,
		node,
		nodeType,
		recursionCount,
		parentRecursionLimit,
	} = config;
	const nodeParent = node.getParents ? node.getParents()[0] : undefined;
	const RenderNode = d3.getRendererByNode(node);

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
