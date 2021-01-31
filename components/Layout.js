import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Consumer } from '../classes/Provider';
import config from '../config';

const {
	devMode
} = config;

const Layout = props => (
	<Consumer>
		{
			({ annuitCœptis, rc }) => {
				const className = false ? `state${ (rc % 4) + 1 }` : 'state2';
				return (
					<div className={ styles.container + ' ' + className }>
						<Head>
							<title>{ props.title || "Human Communication" } D³</title>
							<link rel="icon" href="/favicon.ico" />
						</Head>

						{ props.title ? (
							<header>
								<Link href="/">
									<a title="Back to home screen.">
										<span className="logo">
											D<sup>3</sup>
										</span>
									</a>
								</Link>

								{ devMode ? <>
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
													className={ 'status ' + (annuitCœptis.status[statusAttr] ? 'true' : 'false') }
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
								</> : null }
							</header>
						) : null }

						<main className={styles.main}>
							{ props.children }
						</main>

						<footer className={styles.footer}>
							&copy;2021

							<span className="google">
								<em>
									N
									<em>
										o
										<em>
											t
										</em>
									</em>
								</em>

								<em>
									G
									<em>
										o
										<em>
											o
											<em>
												g
												<em>
													l
													<em>
														e
													</em>
												</em>
											</em>
										</em>
									</em>
								</em>
							</span>
						</footer>
					</div>
				);
			}
		}
	</Consumer>
);

export default Layout;