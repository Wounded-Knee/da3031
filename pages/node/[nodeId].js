import { useRouter } from 'next/router';
import Node from '../../components/Node';
import annuitCœptis from '../../classes/AnnuitCœptis.class';
import { JsonView } from 'json-view-for-react';

export default function NodeView() {
	const router = useRouter();
	const { nodeId } = router.query;

	return (
		<div>
			<Node node={ annuitCœptis.getDataById(nodeId) } annuitCœptis={ annuitCœptis } />
 			<JsonView obj={ annuitCœptis.getData() } showLineNumbers />
		</div>
	);
};

