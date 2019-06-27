
import React, { Component } from 'react';
import { Text,Image, View ,StatusBar, Platform, ActivityIndicator,ImageBackground,Dimensions,TouchableOpacity, ListView, BackHandler, I18nManager} from 'react-native';
import { Container,Button,Right,Left,ListItem,Content,Body, Header} from 'native-base';
import axios from 'axios'
// Screen Styles
import styles from './styles';

import { Images, Metrics } from '../../Themes';

/**
 *  Social Screen
 */
export default class Social04 extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: `${navigation.state.params.locationName}`,
    title:'Posts',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#6FB9F7'
    },
});
  componentWillMount() {
    // var that = this
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //   that.props.navigation.navigate('Social')
    //   return true;
    // });
  }

  constructor(props) {
 		super(props);
     this.state={
      loading: true,
      refreshing: false,
      data: '',
      netWorkError: false,
  }
   }
   componentDidMount(){
    this.getPostInfo();
}
getPostInfo(){
  this.setState({ loading: true });
  console.log(this.props.navigation.getParam('postid','No-Id'))
  axios.get(`http://wasayhere-002-site1.itempurl.com/api/Post/getall/${this.props.navigation.getParam('postid','No-Id')}`).then(res => {
    const data = res.data[0];

    this.setState({ data: data, loading: false,netWorkError:false });
    // alert(JSON.stringify(data));




  }).catch(error => {
    this.setState({ loading: false, netWorkError: true });
    
    ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
  })
}
  render(){
		// StatusBar.setBarStyle('light-content', true);
		// if(Platform.OS === 'android') {
		// 	StatusBar.setBackgroundColor('#2d324f',true);
		// 	StatusBar.setTranslucent(true);
		// }

    var that = this;

    const postImageOne = "https://images.unsplash.com/photo-1511457110622-fd7367fa9014?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=890&q=80";
    

    var {data} = this.state;

  
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
            <Text onPress={()=>{this.getPostInfo();}} style={{color:'red'}}> Retry </Text>
           
  
          </View>
        )
      }
      else {
      return (<Container style={styles.main}>
      
        <Content>
        <View style={styles.rowMainView} >
       
     
           <View style={ styles.lastRowBg}  >
  
              
               <Image style={styles.postDescImage} source={{uri:postImageOne}}></Image>
         
             <Text style={styles.rowPostDescription}>{data.msg}</Text>
             <View style={styles.postDateView}>
              <Text style={[styles.postAuthorDate, {color: "#adadad"}]}>by</Text>
              <Text style={[styles.postAuthorDate, {color: "#0691ce", marginLeft: (Metrics.WIDTH) * 0.010}]}>{data.name}</Text>
              <Text style={[styles.postAuthorDate, {color: "#6f6f6f", marginLeft: (Metrics.WIDTH) * 0.025, marginTop: -(Metrics.HEIGHT) * 0.007}]}>.</Text>
              <Text style={[styles.postAuthorDate, {color: "#adadad", marginLeft: (Metrics.WIDTH) * 0.025}]}>{data.location}</Text>
              <Text style={[styles.postAuthorDate, {color: "#adadad", marginLeft: (Metrics.WIDTH) * 0.025}]}>{data.dpost}</Text>
             </View>
             <View style={styles.rowDescView}>
               <Text style={styles.rowDescTxt}>{data.msg}</Text>
             </View>
            <View style={styles.dividerHorizontal}/>
             <View style={styles.likeCommentShareView}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comments',{postid:data.postid})}>
               <View style={styles.commentView}>
                
                   <Image style={styles.likeCommentShareImage} source={require('../../assets/comments.png')}/>
                
                 <Text style={styles.likeCommentShareText}>{data.TotalComments}</Text>
                 <Text style={styles.likeCommentShareText}>comments</Text>
                 <Right><View style={styles.dividerVertical}/></Right>
               </View>
               </TouchableOpacity>
               
             </View>
   				</View>
         
     

      </View>
      </Content>
      </Container>)
      }    
}
}

