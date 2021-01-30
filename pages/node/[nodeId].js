import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/NodeView.module.css'
import Layout from '../../components/Layout';
import Node from '../../components/Node';
import NodeSelector from '../../components/NodeSelector';
import { JsonView } from 'json-view-for-react';
import { Consumer } from '../../classes/Provider';

export default function NodeView() {
	return (
		<Consumer>
			{
				({ annuitCœptis, router, rc }) => {
					const nodeId = router ? router.query.nodeId : '';
					const node = annuitCœptis.getDataById(nodeId);

					return (
						<Layout title="Node View">
							{
								annuitCœptis.status.dataLoading
									? (
										"Loading..."
									) : (
										annuitCœptis.isInitialized()
											? (
												<ol className="nodes">
													{ node
														? <Node node={ node } />
														: <p>{ `Node #${nodeId} not found.` }</p>
													}
												</ol>
											) : (
												"Loading error."
											)
									)
							}

				 			<JsonView
				 				obj={ annuitCœptis.getData() }
				 				showLineNumbers
				 			/>
						</Layout>
					);
				}
			}
		</Consumer>
	)
};
