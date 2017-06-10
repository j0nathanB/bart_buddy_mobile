import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
  	height: height * 0.75,
  	width: width
  }
};

export default styles;