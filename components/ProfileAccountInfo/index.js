import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  View,
  ListView,
  BackHandler,
  I18nManager,
  AsyncStorage,
  TextInput,Alert,
  ToastAndroid
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  Content,
  Body,
  Header,Picker,
  Icon,
  Title,Input,
} from "native-base";
import Divider from 'react-native-divider';
// import ReadMore from "react-native-read-more-text";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import Loader from '../Loader';
import axios from 'axios';
const profileImg =
  "https://www.midlandgroup.com/wp-content/uploads/2013/03/midland-icons-self-pay.png";

export default class ProfileAccountInfo extends Component {
  static navigationOptions = {
    headerTitle: "Account Info",
    headerRight: (
      <FontAwesome
        onPress={() => alert('This is a button!')}
        name='pencil-square'
        style={{backgroundColor:'white',color:'#6FB9F7'}}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      user : '',
      fname:'',
      lname:'',
      email:'',
      crowded:'',
      alone:'',
      age:'',
      expensive:'',
      gender:'',
      isLoading:false
    };
  }
  componentDidMount() {
     
    this._retrieveData();
    
    
   }
   updateData = () =>{
    
     if(this.state.age == this.state.user.age && this.state.alone == this.state.user.alone && this.state.crowded == this.state.user.crowded && this.state.expensive==this.state.user.expensive && this.state.fname==this.state.user.fname && this.state.gender==this.state.user.gender && this.state.lname == this.state.user.lname){
      Alert.alert(" Error ","No Data to Update");
     }
     else{
       
        if(this.state.age!="" && this.state.alone!="" && this.state.crowded!="" && this.state.expensive!="" && this.state.fname!="" && this.state.gender!="" && this.state.lname!=""){
          this.setState({isLoading:true});
          axios.post(`http://wasayhere-002-site1.itempurl.com/api/User/update/name/${this.state.fname}/email/${this.state.email}/expensive/${this.state.expensive}/gender/${this.state.gender}/crowded/${this.state.crowded}/alone/${this.state.alone}/age/${this.state.age}`).then(res => {
              const data = res.data[0];
              
                  this.setState({user:{...data,userID:this.state.userID}, isLoading:false});
                  // alert(JSON.stringify(this.state.user));
                  ToastAndroid.show('Profile Update Successfully', ToastAndroid.LONG);
                  try {
                      AsyncStorage.setItem('userData', JSON.stringify(this.state.user));
                      
                      this.props.navigation.navigate('Home');
                   } catch (error) {
                     // Error saving data
                     
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
     }
   
   _retrieveData = async () => {
     try {
       const value = await AsyncStorage.getItem('userData');
       let val2 = JSON.parse(value)
       val2.age = val2.age.toString()
       this.setState({user:val2,userID:val2.userID,fname:val2.fname,lname:val2.lname,email:val2.email,crowded:val2.crowded,alone:val2.alone,age:val2.age,expensive:val2.expensive,gender:val2.gender});
       
      } catch (error) {
        // Error retrieving data
      }
   } 
  
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
}


  render() {
    

    return (
      <Container style={styles.main}>
        
        <Content>
          <Image source={{ uri: profileImg }} style={styles.profileImg} />
          <Text style={styles.nameTxt}>{this.state.fname} {this.state.lname} 
         </Text>
         {/*  */}
          {/* <Text style={styles.designationTxt}></Text> 
          <Text style={styles.descTxt}>
            
          </Text> */}
          {/* <TouchableOpacity
            style={styles.connectWithTwitterBg}
            onPress={() => alert("Connect with Twitter")}
          >
            <Text style={styles.connectWithTwitterFbTxt}>
              Connect with Twitter
            </Text>
          </TouchableOpacity>
           */}
          <View style={styles.dividerHorizontal} />
          <View style={styles.accountInfoBg}>
            <Text style={styles.accountInfoTxt}>ACCOUNT INFORMATION</Text>
            
          </View>
          <View style={styles.dividerHorizontal} />
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}> First Name</Text>
              <Input style={styles.input} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='first name' defaultValue={this.state.fname}  onChangeText ={(text) => {this.setState({fname:text}); console.log(this.state.fname)} }/>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Last Name</Text>
              <Input style={styles.input} placeholderTextColor="rgba(230,228,228,0.6)" placeholder='last name' defaultValue={this.state.lname}  onChangeText ={(text) => {this.setState({lname:text}); console.log(this.state.lname)} }/>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Email</Text>
              <Input style={styles.input} disabled placeholderTextColor="rgba(230,228,228,0.6)" placeholder='email' defaultValue={this.state.email} />
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Age</Text>
              <TextInput style={styles.input} keyboardType = 'numeric' placeholderTextColor="rgba(230,228,228,0.6)" placeholder='age' value={this.state.age}  onChangeText ={(text) => {this.setState({age:text}); console.log(this.state.age)} }/>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Expensive</Text>
              <Picker
  selectedValue={this.state.expensive}
  style={{height: 50, width: '100%'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({expensive: itemValue})
    
  }
    
  }>
  <Picker.Item label="Yes" value="yes" />
  <Picker.Item label="No" value="no" />
</Picker>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Gender</Text>
              <Picker
  selectedValue={this.state.gender}
  style={{height: 50, width: '100%'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({gender: itemValue})
    console.log(this.state.gender)
  }
    
  }>
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Female" value="female" />
</Picker>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Crowded</Text>
              <Picker
  selectedValue={this.state.crowded}
  style={{height: 50, width: '100%'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({crowded: itemValue})
    
  }
    
  }>
  <Picker.Item label="Yes" value="yes" />
  <Picker.Item label="No" value="no" />
</Picker>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={styles.infoFieldBg}>
            <Text style={styles.infoFieldTitleTxt}>Alone</Text>
            <Picker
  selectedValue={this.state.alone}
  style={{height: 50, width: '100%'}}
  onValueChange={(itemValue, itemIndex) =>{
    this.setState({alone: itemValue})
    
  }
    
  }>
  <Picker.Item label="Yes" value="yes" />
  <Picker.Item label="No" value="no" />
</Picker>
          </View>
         
        
        
          <TouchableOpacity
            style={styles.connectWithFacebookBg}
            onPress={() => this.updateData()}
          >
            <Text style={styles.connectWithTwitterFbTxt}>
              Update Profile {" "}
              <FontAwesome
       
        name='pencil'
        style={{backgroundColor:'#6FB9F7',color:'white'}}
        size={20}/>
            </Text>
          </TouchableOpacity>
          <View style={{margin:20}}>
          <Divider borderColor="#B9B9B6" color="#B9B9B6" orientation="center">
                            <Text style={{fontSize:12,color:"#B9B9B6"}}> or </Text>
                        </Divider>
          </View>
          
          <TouchableOpacity
            style={styles.connectWithFacebookBg}
            onPress={() => this.signOut()}
          >
            <Text style={styles.connectWithTwitterFbTxt}>
              Logout
            </Text>
          </TouchableOpacity>

        </Content>
        { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
      </Container>
    );
  }
  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View less
      </Text>
    );
  };
}
