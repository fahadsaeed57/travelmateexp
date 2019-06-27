import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar,ImageBackground, ToastAndroid,ScrollView,RefreshControl, FlatList ,BackHandler,TouchableHighlight,Alert,AsyncStorage} from 'react-native';

import { Container, Header, Button, Icon, Fab, Toast } from 'native-base';
import CardView from '../components/CardView';
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Bubbles } from 'react-native-loader';
import Loader from '../components/Loader';
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {  active: 'true',loading: true,user:'',myPosts:'',topViewedLocations:''}
    }
    componentWillMount(){
        this.subs = [
            this.props.navigation.addListener('didFocus', this._retrieveData),
            
          ];
           this._retrieveData();
          
           
    }
    componentDidMount(){
       
        // this.fetchTopLocations();
        // this.fetchUserPosts();
    }
    
    componentWillUnmount(){
        this.subs.forEach(sub => sub.remove());
    }
    _retrieveData = async () => {
        this.fetchTopLocations();
      try {
        const value = await AsyncStorage.getItem('userData');
        this.setState({user:JSON.parse(value)});
        console.log(this.state.user)
        this.fetchUserPosts(this.state.user.userID)
       } catch (error) {
         alert(error);
       }
    } 
    fetchUserPosts(id)
    {   
        const LIMIT = 8;
       
        axios.get(`http://wasayhere-002-site1.itempurl.com/api/Post/userposts/${id}/limit/${LIMIT}`).then(res => {
            let data = res.data;
            if(data[0].postid!=0){
                this.setState({myPosts:data,loading:false})
            }
            else{
                this.setState({myPosts:'',loading:false})
            }
           
            // alert(this.state.myPosts)
            console.log(this.state.myPosts)
        }).catch((error)=>{
            this.setState({loading:true})
            ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
            
        })
       
    }
    fetchTopLocations(){
        const LIMIT = 5;
        axios.get(`http://wasayhere-002-site1.itempurl.com/api/location/topviews/${LIMIT}`).then(res => {
            let data = res.data;
            this.setState({topViewedLocations:data,loading:false})
            // alert(this.state.topViewedLocations)
        }).catch((error)=>{
            this.setState({loading:true})
            ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
            
        })
    }
    
   renderMyPosts = ()  =>{
       
    return( <FlatList
        data={this.state.myPosts}
        horizontal
        renderItem={({ item: rowData }) => {
          return (
            <CardView
              height={180}
              width={170}
              imageUri={`https://images.unsplash.com/photo-1511457110622-fd7367fa9014?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=890&q=80`}
              name={rowData.MSG}
              isTopLoc={false}
              postID = {rowData.postid}
              navigation={this.props.navigation}
            />
             
            
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
         )
   }
   
   topLocations = ()  =>{
    return( <FlatList
        data={this.state.topViewedLocations}
        horizontal
        renderItem={({ item: rowData }) => {
          return (
            <CardView
              height={180}
              width={170}
              imageUri={`${rowData.imageID}`}
              name={rowData.description}
              locationId={rowData.locationID}
              navigation={this.props.navigation}
              isTopLoc={true}
            />
             
            
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
         )
   }
     

    render() {
        // if(this.state.loading){
        //     return(
        //         <Loader
        //                     modalVisible={this.state.loading}
        //                     animationType="slide"/>
        //     )
        // }
        // else{
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

 

            <ScrollView style={{height:hp('100%')}} refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={()=>{this._retrieveData()}}
              colors={['#6FB9F7', '#000000']}
            />
          }>
        
            <TouchableHighlight onPress={()=>{this.props.navigation.navigate('SearchScreen',this.state.user)}} >
             <ImageBackground style={{height:hp('30%'),margin:10,alignItems:'center',alignContent:'center',justifyContent:'center'}} imageStyle={{ borderRadius: 10}}source={{uri:'https://cdn.mangobaaz.com/wp-content/uploads/2016/10/8160999677_80bc8f38ca_b.jpg'}}>
                        
                        <Text style={{color:'white',fontSize:30,fontWeight:'bold',fontFamily:'Montserrat_bold'}}>Travel Guide</Text>
                        
                    </ImageBackground>
                </TouchableHighlight>
                <View style={{  flex: 1, marginTop: 20 }}>
                    <View style={{flexDirection : 'row' ,margin:10}}>
                        <Text style={{fontFamily:'Montserrat_bold',fontSize:20}}> #Top Locations </Text>
                        {/* <Text style={{textAlign:'right',fontFamily:'Montserrat_bold',flex:2}}>See all ></Text> */}

                    </View>
                 
                   
                   
                </View>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.topLocations()}
                    </ScrollView>
                    <View style={{  flex: 1, marginTop: 20 }}>
                    <View style={{flexDirection : 'row' ,margin:10}}>
                        <Text style={{fontFamily:'Montserrat_bold',fontSize:20}}> #My Posts </Text>
                        {/* <Text style={{textAlign:'right',fontFamily:'Montserrat_bold',flex:2}}>See all ></Text> */}

                    </View>
                 
                   
                   
                </View>
                    {/* <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.renderRecommended()}
                    </ScrollView> */}
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>

                        {this.state.myPosts!=''?this.renderMyPosts():<Text > No posts</Text>}
                    </ScrollView>
                   
            </ScrollView>
  
          </View>
           
        )
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10
    }

})