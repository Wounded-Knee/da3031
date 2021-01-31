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
		createNode(txt)
			.then(
				(newNode, x, y, z) => {
					console.log('Creation complete, here is the new node: ', newNode,x,y,z);
					console.groupEnd();
		      		this.setState({
						isLoading: false,
						options: [
							...this.state.options || [],
							newNode
						],
						selectedOption: newNode
					});

					if (selectOnCreate) {
						this.handleChange(
							this.nodeToOption(
								newNode
							)
						);
					}
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
		const { nodeOptions, placeholder, inputOnly } = this.props;
		const newOptions = nodeOptions
			? nodeOptions.map( this.nodeToOption )
			: [];

		return (
			<Creatable
				value={ null }
				menuIsOpen={ inputOnly ? false : undefined }
				onChange={ this.handleChange }
				onCreateOption={ this.onCreateOption }
				options={ newOptions }
				placeholder={ placeholder }
				isSearchable
				autoFocus
			/>
		);
	};
};
