import Link from 'next/link'

const NodeDisplay = (node) => {
	return (
		<Link href={ `/node/${ node.id.toString() }` }>
			<a>{ node.text }</a>
		</Link>
	);
};

export default function NodeList({nodes, heading=undefined, nodeDisplay=NodeDisplay}) {
	return nodes.length ? (
		<>
			{ heading ? <h1>{ heading }</h1> : '' }
			<ul>
				{ nodes.map( node =>
					<li key={ 'node'+node.id }>
				        { nodeDisplay(node) }
					</li>
				) }
			</ul>
		</>
	) : null;
};
