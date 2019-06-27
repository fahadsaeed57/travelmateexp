import React , {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,StatusBar,ToastAndroid,Platform,ImageBackground,ActivityIndicator,Image} from 'react-native';
import {Bubbles} from 'react-native-loader';
import FadeInView from '../components/FadeInView';
import {Font,DangerZone} from 'expo'
const { Lottie } = DangerZone;

export default class AuthLoadingScreen extends Component{
    constructor(props){
        super(props)
        
        // this._isMounted = false;
        this.state = {
            animation: null,
        }
    }
    componentWillMount() {
        
        // this._playAnimation();
      }
      
    
    componentDidMount(){
        Font.loadAsync({
  
            'Roboto_medium': require('../Fonts/Roboto-Medium.ttf'),
            'Montserrat_bold':require('../Fonts/Montserrat-Bold.ttf'),
          }); 
        this._isMounted = true;
        setTimeout(()=>this.loadApp(),2000);
        if (Platform.Version === 26) {
            ToastAndroid.show('Running Oreo', ToastAndroid.SHORT);
          }
    }
    componentWillUnmount(){
        this.isCancelled = true;
    }
    // _playAnimation = () => {
    //     if (!this.state.animation) {
    //       this._loadAnimationAsync();
    //     } else {
    //       this.animation.reset();
    //       this.animation.play();
    //     }
    //   };
    
    //   _loadAnimationAsync = async () => {
    //     let result = await fetch(
    //       'https://assets6.lottiefiles.com/packages/lf20_8wPGfd.json'
    //     )
    //       .then(data => {
    //         return data.json();
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //     this.setState({ animation: result }, this._playAnimation);
    //   }
    
    
    loadApp = async() =>{
        const userToken =  await AsyncStorage.getItem("userData");
        this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }
    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#6FB9F7' }}>
            <ImageBackground style={styles.container} key={'img1'} source={require('../assets/bg.png')}>
                <StatusBar  backgroundColor={'transparent'} translucent />
                <FadeInView style={styles.container}>
                <Image key={'img2'} style={{width:300,height:200}} source={require("../assets/travel1.png")} />
                <Text> {"\n"}</Text>
                <ActivityIndicator size="large" color="#fff" />
                </FadeInView>
                
            </ImageBackground>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex :1,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor:'transparent'
    }

})