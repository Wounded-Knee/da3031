try {
	global.Promise = require('bluebird');
	Promise.config({ cancellation: true });
} catch(e) {
	console.error('Bluebird: ', e);
}
import AnnuitCœptis from '../components/AnnuitCœptis';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
	<AnnuitCœptis>
		<Component {...pageProps} />
	</AnnuitCœptis>
  );
}

export default MyApp
