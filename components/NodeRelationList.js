import NodeList from './NodeList';
import Link from 'next/link'
import { annuitCœptis } from '../classes/AnnuitCœptis.class';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const NodeDisplay = (node) => {
	return node ? (
		<Link href={ `/node/${ node.id }` }>
			<a>{ node.text }</a>
		</Link>
	) : null;
};

export default function NodeRelationList({ rootNode, blacklist, whitelist }) {
	const tabList = annuitCœptis.getRelationshipTypes().map(
		(relationshipType) => relationshipType.titles.reduce(
			(titleAcc, title) => ({
				...titleAcc,
				[title.p]: rootNode[title.g]()
			}), {}
		)
	).reduce(
		(acc, val) => {
			const tabs = { ...acc };
			Object.keys(val).forEach(
				tabKey => {
					if (
						val[tabKey].length > 0 &&
						Object.values(blacklist).indexOf(tabKey) === -1
					) {
						tabs[tabKey] = val[tabKey];
					}
				}
			)
			return tabs;
		}, {}
	);

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
