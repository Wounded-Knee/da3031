import NodeList from './NodeList';
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const NodeDisplay = (node) => {
	return (
		<>
			<Link href={ `/node/${ node.id }` }>
				<a>{ node.text }</a>
			</Link>
		</>
	);
};

export default function NodeRelationList({ rootNode, annuitCœptis, excludedRelationTypes }) {
	if (annuitCœptis.getRelationshipTypes) {
		return (
			<Tabs>
				<TabList>
					{ annuitCœptis
						.getRelationshipTypes()
						.map(
							(nodeRelationType) => <>
								{ nodeRelationType.titles.map(
									title => (
										rootNode[title.g] && excludedRelationTypes.indexOf(title.p) === -1 ? (
											<Tab>{ title.p }</Tab>
										) : null
									)
								) }
							</>
						)
					}
				</TabList>

				{ annuitCœptis
					.getRelationshipTypes()
					.map(
						(nodeRelationType) => <>
							{ nodeRelationType.titles.map(
								title => rootNode[title.g] && excludedRelationTypes.indexOf(title.p) === -1 ? (
									<TabPanel>
										<NodeList
											key={ nodeRelationType.id + title.plural }
											nodes={ rootNode[title.g]() }
											nodeDisplay={ NodeDisplay }
										/>
									</TabPanel>
								) : null
							) }
						</>
					)
				}
			</Tabs>
		);
	} else {
		console.log('getRelationshipTypes undefined @ ', annuitCœptis);
		return null;
	}
};
