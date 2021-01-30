import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';

export default function Home(props) {
	return (
		<Layout { ...props }>
			<h1 className={styles.title}>
				DA30<a href="#">31</a>
			</h1>

			<p className={styles.description}>
				Human Communication
			</p>

			<div className={styles.grid}>
				<Link href="/node/1">
					<a className={styles.card}>
						<h3>Begin Communicating</h3>
						<p>...</p>
					</a>
				</Link>
			</div>
		</Layout>
	)
};
