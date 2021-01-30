import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';
import { Consumer } from '../classes/Provider';

export default function Home(props) {
  return (
    <Consumer>
      {
        ({ annuitCœptis, router, rc }) => {
          const firstNode = annuitCœptis.getOrphans()[0];

          return (
        		<Layout { ...props }>
        			<h1 className={styles.title}>
                D<sup>3</sup>
        			</h1>

        			<p className={styles.description}>
        				Human Communication
        			</p>

              { annuitCœptis.isInitialized() ? (
          			<div className={styles.grid}>
                  {
                    annuitCœptis.getOrphans().filter(
                      (orphan) => orphan.relationType_id === undefined
                    ).map(
                      (orphan) => <Link key={ orphan.id } href={ `/node/${orphan.id}` }>
                          <a className={styles.card}>
                            <h3>{ orphan.text }</h3>
                            <p>Begin Communicating Here</p>
                          </a>
                        </Link>
                    )
                  }
          			</div>
              ) : <div className="loading">Loading...</div> }
        		</Layout>
          );
        }
      }
    </Consumer>
	)
};
