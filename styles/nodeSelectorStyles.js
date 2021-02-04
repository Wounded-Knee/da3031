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
  color: "#f00",
});

const nodeSelectorStylesDark = {
  control: (provided, state) => rainbowBorder(
    darken(provided, state),
    state
  ),
  input: darken,
  menu: darken,
  option: darken,
};

const nodeSelectorStylesLight = {};

const nodeSelectorStyles = config.theme === 'Dark'
  ? nodeSelectorStylesDark
  : nodeSelectorStylesLight;

export default nodeSelectorStyles;
