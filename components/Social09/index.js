
import React, { Component } from 'react';
import { Text,Image, View,StatusBar, Animated,Keyboard,Alert,ToastAndroid,AsyncStorage,Platform, ImageBackground,Dimensions,TouchableOpacity, KeyboardAvoidingView, ListView,TextInput, BackHandler, I18nManager,ActivityIndicator} from 'react-native';
import { Container, Button,Right,Left,ListItem,Content,Body,Header,Icon,Title} from 'native-base';
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { Fonts, Metrics, Colors } from '../../Themes/index';
// Screen Styles
import Loader from '../Loader';
import styles from './styles';

import axios from 'axios'


/**
 *  Profile Screen
 */
export default class Social09 extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: `${navigation.state.params.locationName}`,
    title:'Comments',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#6FB9F7'
    },
});
constructor(props){
  super(props)
  this.state ={
    isAddingComment:false,
    message:'',
    loading: true,netWorkError:false,data:''
  }
}
  componentWillMount() {
   
    this.scrollviewHeight = new Animated.Value(0)
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    this._retrieveData();
    this.getComments()
    
}
keyboardWillShow = (event) => {
    Animated.timing(this.scrollviewHeight,{
        toValue:event.endCoordinates.height,
        duration:200 
    }).start();
}

keyboardWillHide = (event) => {
    Animated.timing(this.scrollviewHeight,{
        toValue:0,
        duration:200
    }).start();
}
_retrieveData = async () => {
        
  try {
    const value = await AsyncStorage.getItem('userData');
    this.setState({user:JSON.parse(value)});
    
    
   } catch (error) {
     alert(error);
   }
}
getComments(){
   

  this.setState({ loading: true });
  axios.get(`http://wasayhere-002-site1.itempurl.com/api/Post/CommentsOnPost/${this.props.navigation.getParam('postid','No-Id')}`).then(res => {
    const data = res.data

    this.setState({ data: data, loading: false,netWorkError:false });

    // alert(JSON.stringify(data));



  }).catch(error => {
    this.setState({ loading: false, netWorkError: true });

    // ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
  })
  }


addComment(){
        
  if(this.state.message.trim()!=''){
      this.setState({ isAddingComment:true });
      // console.log(this.state.user)
      const postComment = {
          userid : Number(this.state.user.userID),
          comment:this.state.message,
          postid : Number(this.props.navigation.getParam('postid','No-Id'))
      }
      // console.log(postLocation)
      axios.post(`http://wasayhere-002-site1.itempurl.com/api/Comment/addcomment`,postComment).then(res => {
          const data = res.data;
    
          this.setState({ isAddingComment:false });
          console.log(data)
          ToastAndroid.show('Comment Added Successfully', ToastAndroid.LONG);
          this.props.navigation.navigate('Home');
    
    
    
        }).catch(error => {
          this.setState({ isAddingComment:false });
          ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
        })
  }
  else{
      Alert.alert("Error" , "comment not found");
  }
}

  

  render(){
		
    
    
    if (this.state.loading === true) {
      return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>

          <ActivityIndicator size="large" color="#6FB9F7" />

        </View>
      )
    }
    if (this.state.netWorkError === true ) {
      return (
        <View style={{ flex: 1, alignItems: 'center',backgroundColor: '#ffffff', justifyContent: 'center' }}>
          <Text>Some thing went wrong</Text>
          <Text onPress={()=>{this.getComments();}} style={{color:'red'}}> Retry </Text>
          

        </View>
      )
    }
    else {

    return(
      <Container style={styles.main}>
    
        <Content>
        <View style={styles.listMainView}>
        {this.state.data.length!=0?
          this.state.data.map((item, index) => {
           return (
             <View style={styles.rowBg} key={index}>
               <View style={{flexDirection: 'row'}}>
                 <Image source={{uri:'https://antiqueruby.aliansoftware.net//Images/social/comments_profile_onesnine.png'}} style={styles.profileImg}/>
                 <View style={styles.nameTimeMainView}>
                   <View style={styles.nameTimeView}>
                     <Text style={styles.rowNameTxt}>{item.email}</Text>
                     {/* <Right><View><Text style={styles.rowTimeTxt}>{item.time}</Text></View></Right> */}
                   </View>
                   <Text style={styles.rowDescTxt}>{item.cmmnts}</Text>
                 </View>
               </View>
               <View style={ (index === this.state.data.length - 1) ? null : styles.dividerHorizontal}/>
            </View>
            )
          }) : <Text> No Comments</Text>
        }
        </View>
      </Content>
      {
        (Platform.OS === 'ios') ?
      <KeyboardAvoidingView behavior="padding" >
      <View style={styles.bottomMainView}>
        <View style={styles.bottomView}>
            
          <TextInput style={styles.commentText}
            placeholder = "Enter your comments..."
            placeholderTextColor = "#c7c7cc"
            underlineColorAndroid = "transparent"
            autoCapitalize = "none"
            keyboardType = "default"
            textAlign= {I18nManager.isRTL ? 'right' : 'left'}
            onChangeText={(message)=>this.setState({message:message})}
            selectionColor={'#6f6f6f'}></TextInput>
            <TouchableOpacity onPress={()=>alert("Voice Recorder")}>
            <Text>send</Text>
            </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
      :
      <Animated.View style={{ width: Metrics.WIDTH,
        height: (Metrics.HEIGHT) * 0.10,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        marginBottom:this.scrollviewHeight
    }}>
        <View style={styles.bottomView}>
         
          <TextInput style={styles.commentText}
            placeholder = "Enter your comments..."
            placeholderTextColor = "#c7c7cc"
            underlineColorAndroid = "transparent"
            autoCapitalize = "none"
            keyboardType = "default"
            textAlign= {I18nManager.isRTL ? 'right' : 'left'}
            onChangeText={(message)=>this.setState({message:message})}
            selectionColor={'#6f6f6f'}></TextInput>
            <TouchableOpacity onPress={()=>this.addComment()}>
            <Text style={{margin:5,color:"#6FB9F7"}}>Comment</Text>
            </TouchableOpacity>
        </View>
      </Animated.View>
      
      }
          { this.state.isAddingComment && <Loader
                            modalVisible={this.state.isAddingComment}
                            animationType="slide"
                        /> }
      </Container>


    );
  }
}
}
