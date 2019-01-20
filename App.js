import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './app/Containers/Home' 
import DetailPost from './app/Containers/DetailPost' 

const AppNavigator = createStackNavigator({
    Home: Home,
    DetailPost: DetailPost,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  });

export default createAppContainer(AppNavigator);