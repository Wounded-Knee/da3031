import React from 'react';
import { annuitCœptis } from '../classes/AnnuitCœptis.class';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';

export default class NodeSelector extends React.Component {
	state = {
		selectedOption: null,
	};

	constructor(props){
		super(props)
		this.state = {
			options: props.nodeOptions
		};
	}

	handleChange = selectedOption => {
		const { onSelect = () => {} } = this.props;
		const { value: node } = selectedOption;
		this.setState({ selectedOption: null });
		onSelect(node);
	};

	onCreateOption = (txt) => {
		const { selectOnCreate = false, createNode } = this.props;

		this.setState({ isLoading: true });
		console.group('Option creating: ', txt);
		console.log('Wait a moment...');
		const newNode = createNode(txt)
			.then(
				() => {
					console.log('Creation complete');
					console.groupEnd();
		      		this.setState({
						isLoading: false,
						options: [
							...this.state.options,
							newNode
						],
						selectedOption: newNode
					});
					if (selectOnCreate) this.handleChange( this.nodeToOption(newNode) );
				}
			)
			.catch(
				(err) => {
					console.error('No good.', err);
					console.groupEnd();
				}
			)
	};

	nodeToOption = (node) => ( node ? {
		value: node,
		label: node.text
	} : undefined);

	render() {
		const { selectedOption, options } = this.state;
		const { nodeOptions } = this.props;
		const newOptions = nodeOptions
			? this.props.nodeOptions.map( this.nodeToOption )
			: [];

		return (
			<Creatable
				value={ null }
				onChange={ this.handleChange }
				onCreateOption={ this.onCreateOption }
				options={ newOptions }
				isSearchable
				autoFocus
			/>
		);
	};
};
