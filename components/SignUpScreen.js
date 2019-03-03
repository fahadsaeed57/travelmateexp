
import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView ,Keyboard,AsyncStorage,ImageBackground,StatusBar,Alert} from 'react-native';
import { Container, Content, Item, Input, Text, Button } from 'native-base';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
import FadeInView from '../components/FadeInView';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Loader from '../components/Loader';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { hidePassword: true,hideConfirmPassword:true, isLoading:false , email:'',password:'',confirmpass:''}
        this._isMounted = false;
    }
    componentDidMount() {
       
        
        this._isMounted = true;
        
      }
    //   changeState(){
    //     this.setState({isLoading:false})
    //     this.props.navigation.navigate('App')
    //   }
      signUp =() =>{
        
        Alert.alert("Sign Up","Sign Up Screen");
        
    }
      componentWillUnMount() {
        
        this._isMounted = false;
        this.isCanceled =  true
      }
      managePasswordVisibility = () =>
      {
        this.setState({ hidePassword: !this.state.hidePassword });
      }
      manageConfrimPasswordVisibility = () =>
      {
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
      }
      
     
    render() {
        // const {isLoading} =  this.state
        return (

            <View style={{ flex: 1, backgroundColor: '#6FB9F7' }}>
            <ImageBackground style={styles.container} key={'img1'} source={require('../assets/bg.png')}>
            <StatusBar  backgroundColor={'transparent'} translucent />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                    <FadeInView>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>SIGN UP</Text>
                    </FadeInView>
                </View>
                <Container style={styles.container}>


                    <Content style={styles.center}>
                       
                        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                            <Item style={styles.input}>
                                <Icon style={styles.input} name='user' />
                                <Input style={styles.input}  placeholderTextColor="rgba(230,228,228,0.6)" placeholder='Username' autoFocus/>
                            </Item>
                            <Item style={styles.input}>
                                <Icon active style={styles.input} name='key' />
                                <Input style={styles.input} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='password' secureTextEntry = { this.state.hidePassword } onChange ={(event) => {this.setState({password:event.target.value}) } }/>
                                <Icon2 style={styles.input} onPress={ ()=>{this.managePasswordVisibility()}} name={this.state.hidePassword ? 'eye-with-line':'eye'} /> 
                            </Item>
                            <Item style={styles.input}>
                                <Icon active style={styles.input} name='key' />
                                <Input style={styles.input} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='confirm password' secureTextEntry = { this.state.hideConfirmPassword } onChange ={(event) => { if(event.target.value!==null) {this.setState({confirmpass:event.target.value}) } else{ this.setState({confirmpass:''}) }  } } />
                             <Icon2 style={styles.input} onPress={ ()=>{this.manageConfrimPasswordVisibility()}} name={this.state.hideConfirmPassword ? 'eye-with-line':'eye'} />
                            </Item>
                        
                           <View style={{marginHorizontal:wp('44%')}}>
                           <Button style={styles.button} block onPress={() => this.signUp()}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </Button>
                            </View> 
                            {/* <Divider borderColor="rgba(230,228,228,0.6)" color="rgba(230,228,228,0.6)" orientation="center">
                            <Text>SignUp </Text>
                        </Divider> */}
                        </KeyboardAvoidingView>
                        { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
                    </Content>

                </Container>

           </ImageBackground>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
        justifyContent: 'center',

    },
    input: {
        color: 'white',
        borderColor: 'rgba(230,228,228,0.6)',
        fontSize:20

    },
    center: {
        marginTop: -50,
    }
    ,
    buttonText:{
        color:'black'
    },
    button:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(237, 236, 236, 0.8)',
        borderRadius:23,
        width:130,
        margin:20,
        borderColor:'white',
    },

})

