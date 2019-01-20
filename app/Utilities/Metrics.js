import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

const Metrics = {
  platform: Platform.OS,
  statusBar: {
    backgroundColor: '#3AB5Cd',
    height: Platform.OS === 'ios' ? 21 : StatusBar.currentHeight,
  },
  screenWidth: x,
  screenHeight: y,
}

export default Metrics