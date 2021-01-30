import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Consumer } from '../classes/Provider';

const Layout = props => (
	<Consumer>
		{
			({ annuitCœptis, rc }) => {
				return (
					<div className={styles.container}>
						<Head>
							<title>DA3031: { props.title || "Human Communication" }</title>
							<link rel="icon" href="/favicon.ico" />
						</Head>

						{ props.title ? (
							<header>
								<Link href="/">
									<a title="Back to home screen.">
										<span>
											D<sup>3</sup>
										</span>
									</a>
								</Link>

								<span
									title={ `${rc} renders counted. Click to re-render.` }
									onClick={ annuitCœptis.reRenderCallback.bind(annuitCœptis) }
								>
									R{ rc }
								</span>
								<span
									title={ `${annuitCœptis.data.length} nodes in the system.` }
								>
									N{ annuitCœptis.data.length }
								</span>

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
						) : null }

						<main className={styles.main}>
							{ props.children }
						</main>

						<footer className={styles.footer}>
							&copy;2021 Anonymous
						</footer>
					</div>
				);
			}
		}
	</Consumer>
);

export default Layout;