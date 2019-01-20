import React, {Component} from 'react';
import {
  Image, 
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert
} from 'react-native';

import Placeholder from 'rn-placeholder';

import styles from './style';
import Api from '../../Config/Api';
import NavBar from '../../Components/NavBar';


type Props = {};
export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: ['dummy','dummy','dummy','dummy','dummy','dummy'],
      isLoading: true
    }
    _HOME = this
  }

  componentDidMount() {
    this._getData()
  }

  _getData = () => {
    this.setState({ isLoading: true })
    Api.get(`movie/now_playing`).then(resp => {
      if (resp.httpStatus == 200) {
        console.log(resp)
        this.setState({ data: resp.data.results, isLoading: false })
      }
      else {
        Alert.alert(
          'Failed!',
          resp.status_message || resp.data.status_message,
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
    return(
      <View style={ styles.listWrapper }>
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
            onPress={ () => this.props.navigation.navigate('DetailPost', { data: item }) }
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
    return (
      <View style={ styles.container }>
        <NavBar 
          title='Now Playing'
          // onBackPress
        />
        <FlatList
          refreshControl={
            <RefreshControl
              progressBackgroundColor='#636e72'
              refreshing={this.state.isLoading}
              onRefresh={ this._getData }
            />
          }
          showsHorizontalScrollIndicator={false}
          style={ styles.flatlistWrap }
          contentContainerStyle={ styles.flatlist }
          data={ this.state.data }
          extraData={ this.state.data }
          renderItem={ this._renderItem }
          keyExtractor={ (item, index) => 'key-'+index }
          removeClippedSubviews={true}
        />
      </View>
    );
  }
}