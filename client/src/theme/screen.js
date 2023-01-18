import {create} from 'react-native-pixel-perfect';
import {Dimensions} from 'react-native';

const designResolution = {
  height: 900,
  width: 400,
};

export const {height, width} = Dimensions.get('screen');

export const perfectSize = create(designResolution);
