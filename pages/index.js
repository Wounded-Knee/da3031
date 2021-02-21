import config from '../d3.config';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';
import NodeSelector from '../components/NodeSelector';
import discordOauth2 from '../classes/DiscordOauth2.class';

const {
  clientId,
  clientSecret,
  redirectUri,
} = config.discord;

export default function Home(props) {
  const { d3 } = props;

  const orphans = d3.getOrphans().filter(
    (orphan) => orphan.relationType_id === undefined
  );

  return (
		<Layout { ...props }>
			<h1 className={styles.title}>
        <Link href={ discordOauth2.getOauth2Url() }>
          <a>D<sup>3</sup></a>
        </Link>
			</h1>

			<p className={styles.description}>
				Human Communication
			</p>

      { d3.isInitialized() ? (
        <>
          <NodeSelector
            nodeOptions={ orphans }
            selectOnCreate={ true }
            placeholder="Say something!"
            inputOnly={ false }
            onSelect={ d3.navigate.bind(d3, undefined) }
            createNode={
              (text) => d3.createNode({
                text
              })
            }
          />

    			<div className={styles.grid}>
            {
              orphans.map(
                (orphan) => {
                  const RenderNode = d3.getRendererByNode(orphan);
                  return (
                    <Link key={ orphan.id } href={ `/node/${orphan.id}` }>
                      <a className={styles.card}>
                        <RenderNode node={ orphan } />
                      </a>
                    </Link>
                  );
                }
              )
            }
    			</div>
        </>
      ) : ( d3.getStatus('wsNetworkError')
        ? <div className="loading">Disconnected</div>
        : <div className="loading">Loading...</div>
      ) }

		</Layout>
	)
};
