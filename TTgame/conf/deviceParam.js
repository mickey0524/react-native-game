import {
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';

const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const dpr = PixelRatio.get();
const OS = Platform.OS;

export {
  totalWidth,
  totalHeight,
  dpr,
  OS,
}