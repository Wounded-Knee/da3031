const config = require('../../config');
import Link from 'next/link'
import styles from '../../styles/NodeView.module.css'
import Layout from '../../components/Layout';
import NodeSelector from '../../components/NodeSelector';
import { Consumer } from '../../classes/Provider';

const
	RT_CHILD_OF = 0,
	RT_AUTHOR_OF = 1,
	RT_TRAVELER = 2
;

export default function NodeView() {
	return (
		<Consumer>
			{
				({ annuitCœptis, router, rc }) => {
					const nodeId = router ? router.query.nodeId : '';
					const node = {
						type: 'default',
						...annuitCœptis.getDataById(nodeId),
					};
					const Node = annuitCœptis.getRendererByNodeType(node.type);

					return (
						<Layout title="Node View">
							{
								!annuitCœptis.status.dataLoaded
									? (
										<div className="loading">Loading...</div>
									) : (
										annuitCœptis.isInitialized()
											? (
												<>
													<ol className="nodes">
														{ node
															? <Node node={ node } />
															: <p>{ `Node #${nodeId} not found.` }</p>
														}
													</ol>

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
										 		</>
											) : (
												"Loading error."
											)
									)
							}
						</Layout>
					);
				}
			}
		</Consumer>
	)
};
