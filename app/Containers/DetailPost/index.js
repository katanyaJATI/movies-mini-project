import React, {Component} from 'react';
import {
  Image, 
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';

import Placeholder from 'rn-placeholder';

import styles from './style';
import Api from '../../Config/Api';
import NavBar from '../../Components/NavBar';
import Metrics from '../../Utilities/Metrics';

import {  widthPercentageToDP } from '../../Utilities/Responsive';

type Props = {};
export default class DetailPost extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: ['dummy','dummy','dummy','dummy'],
      isLoading: true,
      imageBannerHeight: 0,
      imagePosterHeight: {w:1,h:1},
    }
  }

  componentDidMount() {
    this._getSize()
    this._getData()
  }

  _getSize = () => {
    let data = this.props.navigation.getParam('data')
    let width = Metrics.screenWidth

    // get image banner
    Image.getSize(`${Api.hostImgOri}${data.backdrop_path}`, (w, h) => {
      const position = w < h ? 'potrait' : 'landscape';
      const height = position==='potrait' ? ((width) / (w / h)) : ((width) * (h / w));

      this.setState({ imageBannerHeight: height })
    }, (e) => {})

    //get image poster
    Image.getSize(`${Api.hostImgOri}${data.poster_path}`, (w, h) => {
      this.setState({ imagePosterHeight: {w,h} })
    }, (e) => {})
  }

  _getData = () => {
    let data = this.props.navigation.getParam('data')
    this.setState({ isLoading: true })
    Api.get(`movie/${data.id}/similar`).then(resp => {
      if (resp.httpStatus == 200) {
        console.log(resp)
        this.setState({ data: resp.data.results, isLoading: false })
      } else {
        Alert.alert(
          'Failed!',
          resp.status ? resp.data.status_message : resp.status_message,
          [
            {text: 'OK', onPress: () =>  this.setState({ isLoading: false }) },
          ]
        )
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  _renderItem = ({item, index}) => {
    let { h, w } = this.state.imagePosterHeight
    return(
      <View style={[ styles.listWrapper, {height: Metrics.screenWidth/3.5 * (h/w)} ]}>
        <Placeholder.Media
          style={{ alignSelf: 'center', }}
          color="#636e72"
          size={80}
          hasRadius
          onReady={ !this.state.isLoading }
        >
          <TouchableOpacity
            style={ styles.listTouch }
            activeOpacity={.6}
            onPress={ () => this.props.navigation.replace('DetailPost', { data: item }) }
          >
            <Image
              source={{ uri: `${Api.hostImg500}${item.poster_path}` }}
              style={ styles.imgList }
            />
          </TouchableOpacity>
        </Placeholder.Media>
      </View>
    )
  }

  render() {
    let data = this.props.navigation.getParam('data')
    let { h, w } = this.state.imagePosterHeight
    console.log(data)
    return (
      <View style={ styles.container }>
        <NavBar 
          title='Movie Detail'
          onBackPress
        />
        <ScrollView style={ styles.content }>
          <Image
            source={{ uri: `${Api.hostImgOri}${data.backdrop_path}` }}
            style={[ styles.infoImg, {height: this.state.imageBannerHeight} ]}
          />

          <View style={ styles.infoContent }>
            <View style={ styles.infoTitle }>
              <View style={ styles.infoLeft }>
                <Image
                  source={{ uri: `${Api.hostImg500}${data.poster_path}` }}
                  style={{
                    height: widthPercentageToDP(22.5) * (h/w)
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={ styles.infoTitleText }>{ data.original_title }</Text>
                <Text style={ styles.infoTitleSmText }>Release Date : <Text style={ styles.boldText }>{ data.release_date }</Text></Text>
                <Text style={ styles.infoTitleSmText }>Vote Avg : <Text style={ styles.boldText }>{ data.vote_average }</Text></Text>
                <Text style={ styles.infoTitleSmText }>Vote Count : <Text style={ styles.boldText }>{ data.vote_count }</Text></Text>
              </View>
            </View>
            <View style={ styles.infoDesc }>
              <Text style={ styles.infoDescText }>{ '\t\t\t'+data.overview }</Text>
            </View>
          </View>

          <View style={ styles.headerSimilar }>
            <Text style={ styles.headerSimilarText }>Similar Movies</Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={ this.state.data }
            extraData={ this.state.data }
            renderItem={ this._renderItem }
            keyExtractor={ (item, index) => 'key-'+index }
            removeClippedSubviews={true}
          />

        </ScrollView>
        
      </View>
    );
  }
}