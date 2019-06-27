
import React , {Component} from 'react';
import  {createSwitchNavigator,createStackNavigator,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import {TouchableOpacity,View,Button,Easing, Animated} from 'react-native';
import {fromRight,fromDown} from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import WelcomeScreen from  './components/WelcomeScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import AccountInfo from './components/ProfileAccountInfo/index';
import LocationDetails from './components/LocationDetail';
import AddPost from './components/AddPost';
import PostDetails from './components/Social04/index';
import Comments from './components/Social09/index';
const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(2)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    const height = layout.initHeight
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})
let AppScenes = {
 WelcomeScreen : {
      screen: WelcomeScreen
  },
  SignInScreen : {
    screen : SignInScreen
  },
  SignUpScreen : {
    screen: SignUpScreen
  },

}
const AuthStackNavigator = createStackNavigator(AppScenes,  {
  transitionConfig,
  
  navigationOptions: {
    headerVisible: true,
    headerTransparent:true,
    headerStyle: {
      
      backgroundColor: 'transparent', 
      zIndex: 100, 
     
       elevation: 0, 
      shadowOpacity: 0,
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});




const AppTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: AccountInfo,

  },
  {
 transitionConfig,
    navigationOptions: ({ navigation }) => ({
      
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `infocirlce${focused ? '' : 'o'}`;
        } if (routeName === 'Profile') {
          iconName = `user`;
        } 
       
         
       
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    lazy:false,
    tabBarOptions: {
      activeTintColor: '#6FB9F7',
      inactiveTintColor: 'gray',
    },
    
  });
const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{
    screen:AppTabNavigator
    ,
    transitionConfig,
    
    navigationOptions:({ navigation }) =>({
      title : 'Travel Mate',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#6FB9F7'
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
        <View style={{paddingHorizontal : 10 }}>
          <Icon name="plussquare" size={25} color={'#ffffff'}/>
        </View>
      </TouchableOpacity> 
      ),
      headerLeft : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal : 10 }}>
            <Icon name="bars" size={25} color={'#ffffff'}/>
          </View>
        </TouchableOpacity> 
      )
      ,
    })
    ,
  },SearchScreen : SearchScreen,
  LocationDetails:LocationDetails,
  AddPost:AddPost,
  PostDetails : PostDetails,
  Comments : Comments,


},{
  transitionConfig
});
const AppDrawerNavigator = createDrawerNavigator({
  Home : AppStackNavigator
})
export default createSwitchNavigator({
  AuthLoading : AuthLoadingScreen,
  Auth : AuthStackNavigator,
  App: AppDrawerNavigator

},{
  transitionConfig: () => fromDown(300),
}); 

