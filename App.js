
import React , {Component} from 'react';
import  {createSwitchNavigator,createStackNavigator,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import {TouchableOpacity,View,Button} from 'react-native';
import {fromRight,fromDown} from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import WelcomeScreen from  './components/WelcomeScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import AccountInfo from './components/ProfileAccountInfo/index';
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
  transitionConfig: () => fromRight(700),
  
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
    transitionConfig: () => fromRight(),
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
    tabBarOptions: {
      activeTintColor: '#6FB9F7',
      inactiveTintColor: 'gray',
    },
    
  });
const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{
    screen:AppTabNavigator
    ,
    transitionConfig: () => fromRight(),
    
    navigationOptions:({ navigation }) =>({
      title : 'Travel Mate',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#6FB9F7'
      },
      // headerRight: (
      //   <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
      //   <View style={{paddingHorizontal : 10 }}>
      //     <Icon name="" size={25} color={'#ffffff'}/>
      //   </View>
      // </TouchableOpacity> 
      // ),
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
},{
  transitionConfig: () => fromRight(700),
});
const AppDrawerNavigator = createDrawerNavigator({
  Home : AppStackNavigator
})
export default createSwitchNavigator({
  AuthLoading : AuthLoadingScreen,
  Auth : AuthStackNavigator,
  App: AppDrawerNavigator

},{
  transitionConfig: () => fromDown(),
}); 

