import Link from 'next/link';
import styles from '../styles/Debug.module.css';
import Layout from '../components/Layout';
import config from '../config';
import { JsonView } from 'json-view-for-react';
import { Consumer } from '../classes/Provider';
import NodeGraph from '../components/NodeGraph';

export default function Debug() {
	return (
		<Consumer>
			{
				({ annuitCœptis, router, rc }) => {
					return (
						<Layout title="Debug Information">
							<h2>Node Statistics</h2>
							<dl className={ styles.stats }>
								<dt>Data</dt>
								<dd>{ annuitCœptis.data.filter((node) => node.relationType_id === undefined).length }</dd>
								<dt>Relational</dt>
								<dd>{ annuitCœptis.data.filter((node) => node.relationType_id !== undefined).length }</dd>
								<dt className={ styles.total }>Total</dt>
								<dd className={ styles.total }>{ annuitCœptis.data.length }</dd>
							</dl>

							<h2>Node Graph</h2>
							<NodeGraph />

							<h2>Raw Data</h2>
							<JsonView
								obj={ annuitCœptis.data }
								showLineNumbers
							/>
						</Layout>
					);
				}
			}
		</Consumer>
	)
};
