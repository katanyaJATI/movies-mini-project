import {
  StyleSheet,
  Platform
} from 'react-native'

import { widthPercentageToDP, heightPercentageToDP } from '../../Utilities/Responsive'

export default StyleSheet.create({
  headerWrapper: {
    minHeight: 50,
    height: heightPercentageToDP(7),
    maxHeight: 70,
    backgroundColor: '#2d3436',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#636e72'
  },
  headerLeft: {
    minWidth: 50,
    width: heightPercentageToDP(7),
    maxWidth: 70,
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    minWidth: 50,
    width: heightPercentageToDP(7),
    maxWidth: 70,
  },
  headerText: {
    fontSize: heightPercentageToDP(2.5),
    color: '#fff'
  },
  imgIcon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    margin: '20%'
  },

});
