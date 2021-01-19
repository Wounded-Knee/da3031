import NodeList from './NodeList';
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const NodeDisplay = (node) => {
	return node ? (
		<Link href={ `/node/${ node.id }` }>
			<a>{ node.text }</a>
		</Link>
	) : null;
};

export default function NodeRelationList({ rootNode, annuitCœptis, excludedRelationTypes }) {
	const tabList = annuitCœptis.getRelationshipTypes().map(
		(relationshipType) => relationshipType.titles.reduce(
			(titleAcc, title) => ({
				...titleAcc,
				[title.p]: rootNode[title.g]()
			}), {}
		)
	).reduce( (acc, val) => ({ ...acc, ...val }) );

	console.log('tablist', tabList);

	if (annuitCœptis.getRelationshipTypes) {
		return (
			<Tabs>
				<TabList>
					{ Object.keys(tabList).map(tab => <Tab>{ tab }</Tab>) }
				</TabList>

				{ Object.keys(tabList).map(tab => (
					<TabPanel>
						<NodeList
							nodes={ tabList[tab] }
							nodeDisplay={ NodeDisplay }
						/>
					</TabPanel>
				)) }
			</Tabs>
		);
	} else {
		console.log('getRelationshipTypes undefined @ ', annuitCœptis);
		return null;
	}
};
