import Link from 'next/link';
import styles from '../styles/Debug.module.css';
import Layout from '../components/Layout';
import { JsonView } from 'json-view-for-react';
import NodeGraph from '../components/NodeGraph';

export default function Debug({ d3 }) {
	const { nodes } = d3.state;
	const Status = ({ statusName, trueIsGood=false }) => {
		const value = d3.getStatus(statusName);
		return <>
			<dt>{ statusName }</dt>
			<dd style={{ color: value === trueIsGood ? 'green' : 'red' }}>{ value ? 'TRUE' : 'FALSE' }</dd>
		</>;
	};

	return (
		<Layout title="Debug Information" d3={ d3 }>
			<h2>Engine</h2>
			<dl className={ styles.stats }>
				<Status statusName="dataLoading" />
				<Status statusName="dataLoaded" trueIsGood />
				<Status statusName="wsConnected" trueIsGood />
				<Status statusName="wsNetworkError" />
			</dl>
	
			<h2>Node Statistics</h2>
			<dl className={ styles.stats }>
				<dt>Data</dt>
				<dd>{ nodes.filter((node) => node.relationType_id === undefined && node.mixin_id === undefined).length }</dd>
				<dt>Static</dt>
				<dd>{ nodes.filter((node) => node.mixin_id !== undefined).length }</dd>
				<dt>Relational</dt>
				<dd>{ nodes.filter((node) => node.relationType_id !== undefined && node.mixin_id === undefined).length }</dd>
				<dt className={ styles.total }>Total</dt>
				<dd className={ styles.total }>{ nodes.length }</dd>
			</dl>

			{ /*
			<h2>Node Graph</h2>
			<NodeGraph annuitCœptis={ annuitCœptis } />
			*/ }

			<h2>Raw Data</h2>
			<JsonView
				obj={ nodes }
				className={ styles['jsonview-code'] }
				showLineNumbers
			/>
		</Layout>
	);
};
