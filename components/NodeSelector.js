import React from 'react';
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
		const { selectOnCreate = false } = this.props;
		const newOption = this.nodeToOption({
			thisIs: 'a node',
			text: txt
		});

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
					newOption
				],
				selectedOption: newOption
			});
			if (selectOnCreate) this.handleChange(newOption);
		}, 250);
	};

	nodeToOption = (node) => ( node ? {
		value: node,
		label: node.text
	} : undefined);

	render() {
		const { selectedOption, options } = this.state;

		return (
			<Creatable
				value={ this.nodeToOption(selectedOption) }
				onChange={ this.handleChange }
				onCreateOption={ this.onCreateOption }
				options={ options.map( this.nodeToOption ) }
				isSearchable
				autoFocus
			/>
		);
	};
};
