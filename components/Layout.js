import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Consumer } from '../classes/Provider';

const Layout = props => (
	<div className={styles.container}>
		<Head>
			<title>DA3031: { props.title || "Human Communication" }</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<main className={styles.main}>
			{ props.children }
		</main>

		<footer className={styles.footer}>
			&copy;2021 Anonymous
		</footer>
	</div>
);

export default Layout;