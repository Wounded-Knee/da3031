import config from '../config';

const darken = (provided, state) => ({
  ...provided,
  color: '#ccc',
  background: '#2f3136',
});

const rainbowBorder = (provided, state) => ({
  ...provided,
  borderImage: "url(/rainbow.gif) 30 round",
  borderImageRepeat: "stretch",
});

const nodeSelectorStylesBase = {
  container: (provided, state) => ({
    ...provided,
    width: '500px',
    margin: 'auto',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    margin: 'auto',
  }),
};

const nodeSelectorStylesDark = {
  ...nodeSelectorStylesBase,
  control: (provided, state) => ({
    ...rainbowBorder(
      darken(provided, state),
      state
    )
  }),
  input: (provided, state) => ({
    ...darken(provided, state)
  }),
  menu: darken,
  option: darken,
};

const nodeSelectorStylesLight = {
  ...nodeSelectorStylesBase,
};

const nodeSelectorStyles = config.theme === 'Dark'
  ? nodeSelectorStylesDark
  : nodeSelectorStylesLight;

export default nodeSelectorStyles;
