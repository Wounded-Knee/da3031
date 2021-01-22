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
		this.setState({ selectedOption: node });
		onSelect(node);
	};

	onCreateOption = (txt) => {
		const { selectOnCreate = false, createNode } = this.props;
		const newNode = createNode(txt);

		this.setState({ isLoading: true });
		console.group('Option creating: ', txt);
		console.log('Wait a moment...');
    	setTimeout(() => {
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
		}, 250);
	};

	nodeToOption = (node) => ( node ? {
		value: node,
		label: node.text
	} : undefined);

	render() {
		const { selectedOption, options } = this.state;
		const newOptions = options.map( this.nodeToOption );

		console.log('Rendering NodeSelector with options ', newOptions);

		return (
			<Creatable
				value={ this.nodeToOption(selectedOption) }
				onChange={ this.handleChange }
				onCreateOption={ this.onCreateOption }
				options={ newOptions }
				isSearchable
				autoFocus
			/>
		);
	};
};
