
import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView ,Keyboard,AsyncStorage,Dimensions,ScrollView,ImageBackground,StatusBar,Alert,ToastAndroid} from 'react-native';
import { Container, Content, Item, Input, Text, Button ,Picker} from 'native-base';

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
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { hidePassword: true,hideConfirmPassword:true , username:'',email:'',password:'',confirmpass:'', fname:'',crowded:'no',alone:'no', age:'',expensive:'no',gender:'male',isLoading:false}
        this._isMounted = false;
    }
    componentDidMount() {
       
        
        this._isMounted = true;
        
      }
    //   changeState(){
    //     this.setState({isLoading:false})
    //     this.props.navigation.navigate('App')
    //   }
      signUp =async()=>{
        
       
        console.log(this.state)
             const {email,fname,password,confirmpass,username,age,alone,expensive,gender,crowded} = this.state;
             
              if(confirmpass.trim()!=password.trim()){
                Alert.alert("Error","passwords are not equal")
             }
             else if(this.state.email.trim()!=""&&this.state.password.trim()!=""&&this.state.fname.trim()!=""&&this.state.confirmpass.trim()!=""&&this.state.age.trim()!=""&&this.state.username.trim()!=""){
                 this.setState({isLoading:true})
                await fetch('http://wasayhere-002-site1.itempurl.com/api/User/Register', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     "username": username,
                     "email": email,
                     "fname": fname,
                     "pass": password,
                     "age": age,
                     "alone":alone,
                     "expensive":expensive,
                     "gender":gender,
                     "crowded":crowded
                 })
             })
                 .then((response) => response.json())
                 .then((responseJson) => {
                    this.setState({isLoading:false})
                     if (JSON.stringify(responseJson) === '[]') {
                         Alert.alert("An Error Occurred");
                     }
                     else {
                      // Alert.alert(responseJson);
                       if (JSON.stringify(responseJson) == '1') {
                        ToastAndroid.show('Registered Successfully', ToastAndroid.LONG);
                         this.props.navigation.navigate('SignInScreen')
                         
                       }
                       else{ 
                         Alert.alert("Email Already Exists");
                       }
                   
                      }
                 })
                 .catch((error) => {
                     console.error(error);
                     ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
                 })
                
                
                
                // Alert.alert("Success","Registered Successfully") 
             }
      
             else{
                 
                 Alert.alert("Error","Fill all credentials")
             }
             
        
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

            
            <ImageBackground style={styles.container} key={'img1'} source={require('../assets/bg.png')}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                    <FadeInView>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>SIGN UP</Text>
                    </FadeInView>
                </View>
            <ScrollView style={{ height:500, backgroundColor: 'transparent' }}>
            <StatusBar  backgroundColor={'transparent'} translucent />
                
                
                     
                            <Item style={styles.input}>
                                <Icon style={styles.input} name='user' />
                                <Input style={styles.input}  placeholderTextColor="rgba(230,228,228,0.6)" placeholder='email'onChangeText={(email)=>this.setState({email})} autoFocus />
                            </Item>
                            <Item style={styles.input}>
                                <Icon style={styles.input} name='user' />
                                <Input style={styles.input}  placeholderTextColor="rgba(230,228,228,0.6)" placeholder='username' onChangeText={(username)=>this.setState({username})}/>
                            </Item>

                             <Item style={styles.input}>
                                <Icon style={styles.input} name='user' />
                                <Input style={styles.input}  placeholderTextColor="rgba(230,228,228,0.6)" placeholder='first name' onChangeText={(fname)=>this.setState({fname})}/>
                            </Item>
                         
                            <Item style={styles.input}>
                                <Icon style={styles.input} name='user' />
                                <Input style={styles.input}  placeholderTextColor="rgba(230,228,228,0.6)" keyboardType="numeric" placeholder='age'  onChangeText={(age)=>this.setState({age})}/>
                            </Item>
                            <Item style={styles.input}>
                                <Icon active style={styles.input} name='key' />
                                <Input style={styles.input} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='password' secureTextEntry = { this.state.hidePassword } onChangeText ={(password) => {this.setState({password}) } }/>
                                <Icon2 style={styles.input} onPress={ ()=>{this.managePasswordVisibility()}} name={this.state.hidePassword ? 'eye-with-line':'eye'} /> 
                            </Item>
                            <Item style={styles.input}>
                                <Icon active style={styles.input} name='key' />
                                <Input style={styles.input} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='confirm password' secureTextEntry = { this.state.hideConfirmPassword } onChangeText ={(confirmpass) => {this.setState({confirmpass}) }} />
                             <Icon2 style={styles.input} onPress={ ()=>{this.manageConfrimPasswordVisibility()}} name={this.state.hideConfirmPassword ? 'eye-with-line':'eye'} />
                            </Item>
                            <Item style={styles.input}>
                            <Text style={{color:"white"}}>Expensive</Text>
                            <Picker
  selectedValue={this.state.expensive}
  style={{height: 50, width: '100%',color:'rgba(230,228,228,0.6)'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({expensive: itemValue})
    
  }
    
  }>
  <Picker.Item label="Yes" value="yes" />
  <Picker.Item label="No" value="no" />
</Picker>
                            </Item>
                            <Item style={styles.input}>
                            <Text style={{color:"white"}}>Alone</Text>
                            <Picker
  selectedValue={this.state.alone}
  style={{height: 50, width: '100%',color:'rgba(230,228,228,0.6)'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({alone: itemValue})
    
  }
    
  }>
  <Picker.Item label="Yes" value="yes" />
  <Picker.Item label="No" value="no" />
</Picker>
                            </Item>
                            <Item style={styles.input}>
                            <Text style={{color:"white"}}>Crowded</Text>
                            <Picker
  selectedValue={this.state.crowded}
  style={{height: 50, width: '100%',color:'rgba(230,228,228,0.6)'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({crowded: itemValue})
    
  }
    
  }>
  <Picker.Item label="Yes" value="yes" />
  <Picker.Item label="No" value="no" />
</Picker>
                            </Item>
                            <Item style={styles.input}>
                            <Text style={{color:"white"}}>Gender</Text>
                            <Picker
  selectedValue={this.state.gender}
  style={{height: 50, width: '100%',color:'rgba(230,228,228,0.6)'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({gender: itemValue})
    
  }
    
  }>
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Female" value="female" />
</Picker>
                            </Item>
                        
                            
                           
                            
                            
                            

                           
                           
                           
                        
                           <View style={{marginHorizontal:wp('44%')}}>
                           <Button style={styles.button} block onPress={() => this.signUp()}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </Button>
                            </View> 
                            {/* <Divider borderColor="rgba(230,228,228,0.6)" color="rgba(230,228,228,0.6)" orientation="center">
                            <Text>SignUp </Text>
                        </Divider> */}
                       
                        { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
                 
                 </ScrollView>
           </ImageBackground>
  
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
        fontSize:20,
        margin:3

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

