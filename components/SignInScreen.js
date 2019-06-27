import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView ,Keyboard,ImageBackground,StatusBar,ToastAndroid,AsyncStorage ,Alert} from 'react-native';
import { Container, Content, Item, Input, Text, Button } from 'native-base';
import axios from 'axios';
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
export default class SignInScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { hidePassword: true,password:'',email:'',isLoading:false,data:'' }
        
    }
    componentDidMount() {
        
        
        
        
      }
      
      componentWillUnMount() {
        
      }
      getUserDetails(){
        Keyboard.dismiss();
       
        if(this.state.email!="" && this.state.password!=""){
            this.setState({isLoading:true});
            axios.get(`http://wasayhere-002-site1.itempurl.com/api/User/login/email/`+this.state.email.trim()+`/password/`+this.state.password.trim()+``).then(res => {
                const data = res.data;
                if(data.email!=null){
                    
                    this.setState({data: data , isLoading:false});
                    //alert(JSON.stringify(data));
                    try {
                        AsyncStorage.setItem('userData', JSON.stringify(data));
                        // console.log(data.userID)
                        this.props.navigation.navigate('App');
                        
                     } catch (error) {
                       // Error saving data
                     }
                   
                }
                else{
                    this.setState({isLoading:false});
                    Alert.alert(" Error ","Incorrect password or email");
                }
               
                
            }).catch(error => {
                this.setState({ isLoading: false });
                  ToastAndroid.show('Network error occured', ToastAndroid.LONG);
              })
        }
        else{
            Alert.alert(" Error ","Fill Empty Details");
        }
       
            

      }
      managePasswordVisibility = () =>
      {
        this.setState({ hidePassword: !this.state.hidePassword });
      }
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#6FB9F7' }}>
            
                  <ImageBackground style={styles.container} key={'img1'} source={require('../assets/bg.png')}>
                  <StatusBar  backgroundColor={'transparent'} translucent />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FadeInView>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>LOGIN</Text>
                        </FadeInView>
                    </View>
                    <Container style={styles.container}>


                        <Content style={styles.center}>
                            {/* <Divider borderColor="rgba(230,228,228,0.6)" color="rgba(230,228,228,0.6)" orientation="center">
                            <Text>LOGIN </Text>
                        </Divider> */}
                            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                                <Item style={styles.input}>
                                    <Icon style={styles.input} name='user' />
                                    <Input style={styles.input} onChangeText={email => this.setState({ email })} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='Email' autoFocus />
                                </Item>
                                <Item style={styles.input}>
                                    <Icon active style={styles.input} name='key' />
                                    <Input style={styles.input} onChangeText={password => this.setState({ password })} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='password' secureTextEntry={this.state.hidePassword} />
                                    <Icon2 style={styles.input}  onPress={() => { this.managePasswordVisibility() }} name={this.state.hidePassword ? 'eye-with-line' : 'eye'} />
                                </Item>

                                <View style={{ marginHorizontal: wp('44%') }}>
                                    <Button style={styles.button} block onPress={() => { this.getUserDetails()}}>
                                        <Text style={styles.buttonText}>LOGIN</Text>
                                    </Button>
                                </View>
                                
                            </KeyboardAvoidingView>
                        </Content>

                    </Container>
                    { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
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