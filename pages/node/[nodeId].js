import { useRouter } from 'next/router';
import Node from '../../components/Node';
import annuitCœptis from '../../classes/AnnuitCœptis.class';
import { JsonView } from 'json-view-for-react';

export default function NodeView() {
	const router = useRouter();
	const { nodeId } = router.query;

	return (
		<>
			<ol className="nodes">
				<Node node={ annuitCœptis.getDataById(nodeId) } />
			</ol>

 			<JsonView obj={ annuitCœptis.getData() } showLineNumbers />
		</>
	);
};
