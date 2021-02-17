const config = require('../config');
import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import discordOauth2 from '../classes/DiscordOauth2.class';

const {
	devMode,
	theme,
} = config;

const Layout = ({ title, children }) => {
	return (
		<div className={ [styles.container, 'state2', 'theme'+theme].join(' ') }>
			<Head>
				<title>{ title || "Human Communication" } D³</title>
				<link rel="shortcut icon" type="image/gif" href="/d3.gif" />
				<link rel="icon" type="image/gif" href="/d3.gif" />
			</Head>

			{ title ? (
				<header>
					<Link href="/">
						<a title="Back to home screen." className="logo">
							<span>
								D<sup>3</sup>
							</span>
						</a>
					</Link>

					<Link href="/debug">
						<a title="Debug Information">
							🧪
						</a>
					</Link>

	        <Link href={ discordOauth2.getOauth2Url() }>
						<a title="Discord Login">
							🗝
						</a>
					</Link>
				</header>
			) : null }

			<main className={styles.main}>
				{ children }
			</main>

			<footer className={styles.footer}>
				&copy;2021 <a href="https://github.com/WAKlNYAN/">WAKlNYAN</a>
			</footer>
		</div>
	);
};

export default Layout;