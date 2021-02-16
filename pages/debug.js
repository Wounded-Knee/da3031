const config = require('../config');
import Link from 'next/link';
import styles from '../styles/Debug.module.css';
import Layout from '../components/Layout';
import { JsonView } from 'json-view-for-react';
import NodeGraph from '../components/NodeGraph';

export default function Debug({ annuitCœptis, router, rc }) {
	const Status = ({ statusName, trueIsGood=false }) => {
		const value = annuitCœptis.status[statusName];
		return (
			<p style={{ color: value === trueIsGood ? 'green' : 'red' }}>
				{ statusName }={ value ? '1' : '0' }
			</p>
		);
	};

	return (
		<Layout title="Debug Information" annuitCœptis={ annuitCœptis }>
			<h2>Node Statistics</h2>
			<dl className={ styles.stats }>
				<dt>Status</dt>
				<dd>
					<Status statusName="dataLoading" />
					<Status statusName="dataLoaded" trueIsGood />
					<Status statusName="wsConnected" trueIsGood />
					<Status statusName="wsNetworkError" />
				</dd>
				<dt>Data</dt>
				<dd>{ annuitCœptis.data.filter((node) => node.relationType_id === undefined).length }</dd>
				<dt>Relational</dt>
				<dd>{ annuitCœptis.data.filter((node) => node.relationType_id !== undefined).length }</dd>
				<dt className={ styles.total }>Total</dt>
				<dd className={ styles.total }>{ annuitCœptis.data.length }</dd>
			</dl>

			{ /*
			<h2>Node Graph</h2>
			<NodeGraph annuitCœptis={ annuitCœptis } />
			*/ }

			<h2>Raw Data</h2>
			<JsonView
				obj={ annuitCœptis.data }
				showLineNumbers
			/>
		</Layout>
	);
};
