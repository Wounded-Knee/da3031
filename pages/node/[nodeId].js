import { useRouter } from 'next/router'
import Node from '../../components/Node';
import annuitCœptis from '../../classes/AnnuitCœptis.class';
import { JsonView } from 'json-view-for-react'
 
const data = {
	node: [
		/* Users */
		{
			id: 100,
			nodeType_id: 2,
			text: 'Heyoka',
			emoji: '👑'
		},
		{
			id: 101,
			nodeType_id: 2,
			text: 'Bruce',
			emoji: '🗽'
		},
		{
			id: 102,
			nodeType_id: 2,
			text: 'Lexi',
			emoji: '❤️️'
		},
		{
			id: 103,
			nodeType_id: 2,
			text: 'Carl',
			emoji: '🍔'
		},

		/* Comments */
		{
			id: 1,
			nodeType_id: 1,
			text: 'Hello, world!'
		},
		{
			id: 2,
			nodeType_id: 1,
			text: 'Hi there!'
		},
		{
			id: 3,
			nodeType_id: 1,
			text: 'Hello.'
		},
		{
			id: 5,
			nodeType_id: 1,
			text: 'How ya doin?'
		},
		{
			id: 4,
			nodeType_id: 1,
			text: 'Hi!'
		}
	],
	nodeRelation: [
		/* Maternal */
		{
			relation_id: 1,
			author_id: 100,
			privacy: 1,
			relatives: [1,2]
		},
		{
			relation_id: 1,
			author_id: 100,
			privacy: 2,
			relatives: [1,3]
		},
		{
			relation_id: 1,
			author_id: 100,
			privacy: 4,
			relatives: [1,4]
		},
		{
			relation_id: 1,
			author_id: 100,
			privacy: 7,
			relatives: [3,5]
		},

		/* Federation */
		{
			relation_id: 2,
			author_id: 100,
			privacy: 1,
			relatives: [3,2]
		},
		{
			relation_id: 2,
			author_id: 100,
			privacy: 1,
			relatives: [3,4]
		},

		/* Authorship */
		{
			relation_id: 3,
			author_id: 100,
			privacy: 1,
			relatives: [100,5]
		},
		{
			relation_id: 3,
			author_id: 100,
			privacy: 1,
			relatives: [100,1]
		},
		{
			relation_id: 3,
			author_id: 100,
			privacy: 1,
			relatives: [101,2]
		},
		{
			relation_id: 3,
			author_id: 100,
			privacy: 1,
			relatives: [102,3]
		},
		{
			relation_id: 3,
			author_id: 100,
			privacy: 1,
			relatives: [103,4]
		}


	],
	relation: [
		{
			id: 1,
			name: "Lineage",
			titles: [
				{s: 'parent', p: 'parents'},
				{s: 'child', p: 'children'}
			]
		},
		{
			id: 2,
			name: "Confederation",
			titles: [
				{s: 'federation', p: 'federations'},
				{s: 'state', p: 'states'}
			]
		},
		{
			id: 3,
			name: "Authorship",
			titles: [
				{s: 'author', p: 'authors'},
				{s: 'work', p: 'works'}
			]
		}
	],
	nodeType: [
		{
			id: 1,
			name: 'Comment'
		},
		{
			id: 2,
			name: 'User'
		}
	]
};

export default function NodeView() {
	const router = useRouter();
	const { nodeId } = router.query;
	return (
		<div>
 			<JsonView obj={ annuitCœptis.getData() } showLineNumbers />
		</div>
	);
};

