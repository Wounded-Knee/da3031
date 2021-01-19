import Link from 'next/link'

const NodeDisplay = (node) => {
	return node ? (
		<Link href={ `/node/${ node.id.toString() }` }>
			<a>{ node.text }</a>
		</Link>
	) : null;
};

export default function NodeList({nodes, heading=undefined, nodeDisplay=NodeDisplay}) {
	return nodes.length ? (
		<>
			{ heading ? <h1>{ heading }</h1> : '' }
			<ul className="nodeList">
				{ nodes.map( node =>
					<li key={ 'node'+node.id }>
				        { nodeDisplay(node) }
					</li>
				) }
			</ul>
		</>
	) : null;
};
