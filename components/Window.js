import React, { useEffect } from 'react';
import { annuitCœptis } from '../classes/AnnuitCœptis.class';

const Window = () => {
  useEffect(
  	() => {
			annuitCœptis.setWindow(window);
  	}
  )

  return null;
};

export default Window
