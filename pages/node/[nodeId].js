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
							<header>
								<span onClick={ annuitCœptis.reRenderCallback.bind(annuitCœptis) }>R{ rc }</span>
								<span>N{ annuitCœptis.data.length }</span>

								{
									Object.keys(annuitCœptis.status).map(
										(statusAttr) => annuitCœptis.status[statusAttr] ? (
											<span
												key={ statusAttr }
												className={ annuitCœptis.status[statusAttr] ? 'true' : 'false' }
											>
												{ statusAttr }
											</span>
										) : null
									)
								}

								{ annuitCœptis.getAvatars().map(
									avatar => <span
										onClick={ annuitCœptis.setAvatar.bind(annuitCœptis, avatar) }
										className={ activeAvatar === avatar ? 'active' : '' }
									>{ avatar.text }</span>
								) }
							</header>

							{ annuitCœptis.isInitialized() ? (
								<NodeSelector createNode={ (txt) => annuitCœptis.createData({ text: txt }) } />
							) : null }

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
													{
														annuitCœptis.getOrphans().filter(
															(orphan) => orphan.id !== nodeId && orphan.relationType_id === undefined
														).map(
															(orphan) => <Node
																key={ orphan.id }
																node={ orphan }
															/>
														)
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
