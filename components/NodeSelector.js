import Downshift from 'downshift';

export default function Node({ nodeList }) {
	return <Downshift
		    onChange={selection =>
		      alert(selection ? `You selected ${selection.text}` : 'Selection Cleared')
		    }
		    itemToString={item => (item ? item.text : '')}
		  >
		    {({
		      getInputProps,
		      getItemProps,
		      getLabelProps,
		      getMenuProps,
		      isOpen,
		      inputValue,
		      highlightedIndex,
		      selectedItem,
		      getRootProps,
		    }) => (
		      <div>
		        <label {...getLabelProps()}>...</label>
		        <div
		          style={{display: 'inline-block'}}
		          {...getRootProps({}, {suppressRefError: true})}
		        >
		          <input {...getInputProps()} />
		        </div>
		        <ul {...getMenuProps()}>
		          {isOpen
		            ? nodeList
		                .filter(item => !inputValue || item.text.includes(inputValue))
		                .map((item, index) => (
		                  <li
		                    {...getItemProps({
		                      key: item.text,
		                      index,
		                      item,
		                      style: {
		                        backgroundColor:
		                          highlightedIndex === index ? 'lightgray' : 'white',
		                        fontWeight: selectedItem === item ? 'bold' : 'normal',
		                      },
		                    })}
		                  >
		                    {item.text}
		                  </li>
		                ))
		            : null}
		        </ul>
		      </div>
		    )}
		  </Downshift>
};
