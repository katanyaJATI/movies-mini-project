import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './style';

import ImagesPath from '../../Config/Images'

type Props = {};
class Navbar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={ styles.headerWrapper }>
        <TouchableOpacity 
          onPress={ () => this.props.navigation.goBack() }
          style={ styles.headerLeft }
          disabled={ !this.props.onBackPress }
        >
          {
            this.props.onBackPress &&
              <Image
                source={ ImagesPath.icon.arrow_left }
                style={ styles.imgIcon }
              />
          }
        </TouchableOpacity>
        <View style={ styles.headerCenter }>
          <Text style={ styles.headerText }>
            { this.props.title }
          </Text>
        </View>
        <View style={ styles.headerRight } />
      </View>
    );
  }
}

export default withNavigation(Navbar)