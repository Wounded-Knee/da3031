import { default as BaseNode } from '../../components/Node';

const RenderNode = ({node}) => (
	<div>{ node.text }</div>
);

export default function Node(props) {
	return (
		<BaseNode
			{...props}
			RenderNode={ RenderNode }
		/>
	);
};
