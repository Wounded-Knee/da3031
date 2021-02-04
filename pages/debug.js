import Link from 'next/link'
import styles from '../styles/NodeView.module.css'
import Layout from '../components/Layout';
import config from '../config';
import { JsonView } from 'json-view-for-react';
import { Consumer } from '../classes/Provider';

export default function Debug() {
	return (
		<Consumer>
			{
				({ annuitCœptis, router, rc }) => {
					return (
						<Layout title="Debug Information">
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
