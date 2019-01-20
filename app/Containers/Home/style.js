import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../../Utilities/Responsive';
import Metrics from '../../Utilities/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  flatlistWrap: {
    marginVertical: heightPercentageToDP(1)
  },
  flatlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listWrapper: {
    width: (Metrics.screenWidth / 3),
    height: (Metrics.screenWidth / 2) - heightPercentageToDP(1/3*2),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  listTouch: {
    flex: 1,
    marginRight: heightPercentageToDP(.5),
    marginLeft: heightPercentageToDP(.5),
  },
  imgList: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain'
  },

  loadMore: {
    width: widthPercentageToDP(50),
    alignSelf: 'center',
    borderRadius: 100,
    height: heightPercentageToDP(7),
    backgroundColor: '#353b48',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loadMoreText: {
    fontSize: heightPercentageToDP(2),
    color: '#fff',
    textAlign: 'center'
  }
})