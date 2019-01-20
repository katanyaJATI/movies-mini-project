import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../../Utilities/Responsive';
import Metrics from '../../Utilities/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  content: {
    flex: 1,
  },
  infoContent: {
    paddingHorizontal: '3%'
  },
  infoLeft: {
    width: widthPercentageToDP(22.5), 
    marginRight: 10
  },
  infoTitle: {
    paddingVertical: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  infoTitleText: {
    fontSize: heightPercentageToDP(3),
    color: '#fff'
  },
  infoTitleSmText: {
    fontSize: heightPercentageToDP(1.8),
    color: '#fff'
  },
  boldText: {
    fontWeight: 'bold'
  },
  infoDesc: {
    paddingVertical: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  infoDescText: {
    fontSize: heightPercentageToDP(2),
    color: '#fff',
    textAlign: 'justify'
  },
  infoImg: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },
  infoImgPoster: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },

  headerSimilar: {
    paddingHorizontal: '3%',
    paddingVertical: 10,
  },
  headerSimilarText: {
    fontSize: heightPercentageToDP(3),
    color: '#fff',
  },
  listWrapper: {
    width: Metrics.screenWidth/3.5,
    justifyContent: 'center',
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
    resizeMode: 'contain',
    borderRadius: 20,
  },
  noDataText: {
    fontSize: heightPercentageToDP(2),
    color: '#fff',
    width: Metrics.screenWidth,
    // textAlign: 'center',
    marginHorizontal: widthPercentageToDP(3),
    fontWeight: 'bold'
  },
})