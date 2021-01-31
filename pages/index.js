import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';
import NodeSelector from '../components/NodeSelector';
import { Consumer } from '../classes/Provider';

export default function Home(props) {
  return (
    <Consumer>
      {
        ({ annuitCœptis, router, rc }) => {
          const orphans = annuitCœptis.getOrphans().filter(
            (orphan) => orphan.relationType_id === undefined
          );

          return (
        		<Layout { ...props }>
        			<h1 className={styles.title}>
                D<sup>3</sup>
        			</h1>

        			<p className={styles.description}>
        				Human Communication
        			</p>

              { annuitCœptis.isInitialized() ? (
                <>
                  <NodeSelector
                    selectOnCreate={ true }
                    placeholder="Say something!"
                    inputOnly={ false }
                    onSelect={ annuitCœptis.navigate.bind(annuitCœptis, undefined) }
                    createNode={
                      (text) => annuitCœptis.createData({
                        text
                      })
                    }
                  />

            			<div className={styles.grid}>
                    {
                      orphans.map(
                        (orphan) => <Link key={ orphan.id } href={ `/node/${orphan.id}` }>
                            <a className={styles.card}>
                              <h3>{ orphan.text }</h3>
                              <p>Begin Communicating Here</p>
                            </a>
                          </Link>
                      )
                    }
            			</div>
                </>
              ) : <div className="loading">Loading...</div> }
        		</Layout>
          );
        }
      }
    </Consumer>
	)
};
